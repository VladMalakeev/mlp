<?php
include 'DataBase.php';

function getListTypeSupplies(){
    $db = DataBase::getInstance();
    $sql = "SELECT * FROM type_suplies";
    $result = $db->query($sql);
    while($item = $result->fetch(PDO::FETCH_ASSOC)){
        $itemArray[] = $item;
    }
    return $itemArray;
}

function getTypeItem($id){//Переводит значение типа из числа в понятие
    $db = DataBase::getInstance();
    $sql = "SELECT * FROM type_suplies WHERE id='$id'";
    $result = $db->query($sql);
    $type = $result->fetch(PDO::FETCH_LAZY);
    return $type;
}
//не трогать

function getSuppliesByType($type){
    $db = DataBase::getInstance();
	$itemArray = array();
    $sql = "SELECT * FROM supplies where type='$type'";
    $result = $db->query($sql);
    while($item = $result->fetch(PDO::FETCH_ASSOC)){
        $itemArray[] = $item;
    }
    return $itemArray;
}


//возвращает массив товаров по типу которых нет на складе
if(isset($_POST['getWish'])){
    $db = DataBase::getInstance();
    $type = $_POST['type'];
    $sql = "SELECT * FROM supplies where type='$type' AND count_item=0 ";
    $result = $db->query($sql);
    while($item = $result->fetch(PDO::FETCH_ASSOC)){
        $itemArray[] = $item;
    }
    echo json_encode($itemArray);
}


//возвращает массив товаров по типу которых присутствуют в наличии
if(isset($_POST['getInStock'])){
    $db = DataBase::getInstance();
    $type = $_POST['type'];
    $sql = "SELECT * FROM supplies where type='$type' AND count_item>0 ";
    $result = $db->query($sql);
    while($item = $result->fetch(PDO::FETCH_ASSOC)){
        $itemArray[] = $item;
    }
    echo json_encode($itemArray);
}

//получение одного товара
if(isset($_GET['getItem'])){
    $db = DataBase::getInstance();
    $id = $_GET['id'];
    $sql = "SELECT * FROM supplies where id='$id'";
    $result = $db->query($sql);
    $item = $result->fetch(PDO::FETCH_LAZY);
    echo json_encode($item);
}

//функция отправки эмайла
function sendMessageMail($to, $from, $title, $message)
 {
   //Формируем заголовок письма
   $subject = $title;
   $subject = '=?utf-8?b?'. base64_encode($subject) .'?=';
   
   //Формируем заголовки для почтового сервера
   $headers  = "Content-type: text/html; charset=\"utf-8\"\r\n";
   $headers .= "From: ". $from ."\r\n";
   $headers .= "MIME-Version: 1.0\r\n";
   $headers .= "Date: ". date('D, d M Y h:i:s O') ."\r\n";
   //Отправляем данные на ящик админа сайта
   if(!mail($to, $subject, $message, $headers))
      return 'Ошибка отправки письма!';  
   else  
      return true;  
 }

 //проверка на нажатие кропки отправки предзаказа
if(isset($_POST['wishOrder'])){
    $userData = json_decode($_POST['userInfo']);
    $item = json_decode($_POST['items']);
    $adminEmail = "vitariel@ukr.net";

    $textForCustomer =
        "Здравствуйте,". $userData->{"firstName"}." ". $userData->{"patronymic"} .
        " спасибо что пользуетесь нашим магазином<br>".
        "Вы заказали:<br>"."<img src='".$item->{"src"}."' width='100' height='50'> ".
        " цена - ".$item->{"cost"}.
        "<br>Когда товар будет на складе мы с вами свяжемся";

    $textForAdmin =
        "Новый предзаказ от: ". $userData->{"lastName"}." ".$userData->{"firstName"}." ".$userData->{"patronymic"}.
        "<br>Телефон: ".$userData->{"phone"}.
        "<br>Город: ".$userData->{"city"}.
        "<br>email: ".$userData->{"email"}.
        "<br>Заказал:<br>".
        "<img src='".$item->{"src"}."' width='100' height='50'> ".
        " цена - ".$item->{"cost"};

    $emailTitleForCustomer = "Вы сделали предзаказ на сайте mlpod.ml";
    $emailTitleForAdmin = "Новый предзаказ";
    if(sendMessageMail( $userData->{"email"}, 'greenlightsahdow@mlpod.ml', $emailTitleForCustomer, $textForCustomer) &&
        sendMessageMail( $adminEmail, 'greenlightsahdow@mlpod.ml', $emailTitleForAdmin, $textForAdmin) ){
        echo true;

    }
    else echo false;
}

//проверка на нажатие кропки оформления заказа
if(isset($_POST['confirmOrder'])){
    $userData = json_decode($_POST['userInfo']);
    $items = json_decode($_POST['items']);
    $adminEmail = "vitariel@ukr.net";
    $allCount = 0;
    foreach ($items as $item){
        $allCount += $item->{"cost"};
        $itemsOnMassage .=  "<img src='".$item->{"src"}.
                            "' width='100' height='50'> ".
                            " количество - ".$item->{"count"}.
                            " цена - ".$item->{"cost"}."<br>";
    }


    $textForCustomer =
        "Здравствуйте,". $userData->{"firstName"}." ". $userData->{"patronymic"}." спасибо что пользуетесь нашим магазином<br>".
       " Ваш заказ: <br>".$itemsOnMassage .
        " Общая стоимость: ".$allCount.
        "<br>Ожидайте звонка";

    $textForAdmin =
        "Новый заказ от: ". $userData->{"lastName"}." ".$userData->{"firstName"}." ".$userData->{"patronymic"}.
        "<br>Телефон: ".$userData->{"phone"}.
        "<br>Город: ".$userData->{"city"}.
        "<br>email: ".$userData->{"email"}.
        "<br>Заказал:<br>".$itemsOnMassage;

    $emailTitleCustomer = "Вы сделали заказ на сайте mlpod.ml";
    $emailTitleForAdmin = "Новый заказ";
    if(sendMessageMail( $userData->{"email"}, 'greenlightsahdow@mlpod.ml', $emailTitleCustomer, $textForCustomer) &&
        sendMessageMail( $adminEmail, 'greenlightsahdow@mlpod.ml', $emailTitleForAdmin, $textForAdmin)){
        echo true;
    }
    else echo false;
}