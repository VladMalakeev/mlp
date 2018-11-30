//работа с корзиной

//проверка на выбраный елемент (товар в наличии или нет)
var orderStatus = null;
//выбраный пользвателем элемент
var activeElement = null;
//статус формы (для предзаказа или оформления заказа)
var formStatus = null;
//выведем на экран корзину
initCart();

//инициализация кнопки сделать заказ
var btnOrder = document.getElementById('makeOrder');
btnOrder.disabled = true;

//инициализируем корзину
function initCart() {
    var prise=0;
    var cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    if(cart == null) {
        prise = 0;
    }else {
      for(var i = 0; i<cart.length;i++){
          prise += Number(cart[i].cost);
      }
    }
    var cartBlock = document.getElementById('cart');
    cartBlock.innerHTML = prise;
}


//кнопка сделать предзаказ или добавить в крзину
function clickBtnOrder() {
    if(orderStatus == 'instock'){
        var itemArray = [];
        //создаем объект для добавления в корзину
        var itemObject = {
            'id': activeElement.getAttribute('data-id'),
            'type': document.getElementById('sign').getAttribute('data-type'),
            'count': 1,
            'cost': Number(document.getElementById('itemCost').getAttribute('data-cost')),
            'src': activeElement.src
        };

        //если корзина не пуста
        if(localStorage.getItem('cart')!= null) {
            //тогда считываем все товары в массив
            itemArray = JSON.parse(localStorage.getItem('cart'));
            var equals = 0;
            //циклом пробигаемся по массиву товаров
            for(var i=0;i<itemArray.length;i++){
                //сравниваем по id элементы в корзине
                console.log(itemArray[i].id + '?' +activeElement.getAttribute('data-id'));

                if(itemArray[i].id == activeElement.getAttribute('data-id')){
                    console.log("id равны");
                    //тда нывый объект не добавляем, а увеличиваем количество существующего
                    itemArray[i].count++;
                    //увеличиваем стоиость
                    itemArray[i].cost = Number(itemArray[i].cost)+Number(document.getElementById('itemCost').getAttribute('data-cost'));
                    equals++;
                }
            }
            if(equals==0){
                    itemArray.push(itemObject);
                    console.log("добвляем(1)!!!");
            }

        }
        else{
            //иначе просто добавляем нвый товар
            itemArray.push(itemObject);
            console.log("добавляем(2)");
        }
        localStorage.setItem('cart', JSON.stringify(itemArray));
        initCart();
    }
//если твара нет на складе
    if(orderStatus == 'wish') {
        var itemWishObject = {
            'id': activeElement.getAttribute('data-id'),
            'type': document.getElementById('sign').getAttribute('data-type'),
            'count': 0,
            'cost': Number(document.getElementById('itemCost').getAttribute('data-cost')),
            'src': activeElement.src
        };
        localStorage.setItem('wish', JSON.stringify(itemWishObject));
       viewForm('wishOrder');
    }

}
//скрыть фому
function hideInStockOrder() {
    var form = document.getElementById('order_form');
    form.style.display = 'none';
}

//отображение корзины
function viewCart() {
    var cartBlock = document.getElementById('cartContent');
    cartArray= JSON.parse(localStorage.getItem('cart'));
    var allCost = 0;
    var allCount = 0;
    var table = document.getElementById('cartTable');
    table.innerHTML = '';
    if(cartArray == null || cartArray.length == 0){
        h1 = document.createElement('h1');
        h1.innerHTML = 'Корзина пуста';
        cartBlock.appendChild(h1);

        emptyCart = document.createElement('img');
        emptyCart.src = 'images/empty.png';
        emptyCart.width = '300';
        emptyCart.height = '400';
        cartBlock.appendChild(emptyCart);
    }
    else {
        table.innerHTML = ' <tr>\n' +
            '                <th>№</th>\n' +
            '                <th>Товар</th>\n' +
            '                <th>Категория</th>\n' +
            '                <th>Количество</th>\n' +
            '                <th>Цена</th>\n' +
            '                <th>Действие</th>\n' +
            '            </tr>';
        for (var i = 0; i < cartArray.length; i++) {
            row = addElement(i, cartArray[i]);
            allCost += cartArray[i].cost;
            allCount += cartArray[i].count;
            table.appendChild(row);
        }
        sendValue="confirmOrderByEmail";
        table.insertAdjacentHTML("beforeEnd", ' <tr>\n' +
            '                <th><button onclick="clearCart()">Очистить корзину</button></th>\n' +
            '                <th></th>\n' +
            '                <th></th>\n' +
            '                <th><b>'+allCount+'</b></th>\n' +
            '                <th><b>'+allCost+'</b></th>\n' +
            '                <th><button id="confirmOrderButton">Сделать заказ</button></th>\n' +
            '            </tr>');
        document.getElementById('confirmOrderButton').addEventListener('click',function () {
            viewForm("confirmOrderByEmail");
        });
    }
}

//генерирование 1-го элемента в корзине
function addElement(i,item) {
    i++;
    //создадим составляющие таблици
   var tr = document.createElement('tr');
    paramArray = ['<td>'+i+'</td',
                  '<td><img width="128" height="72" src="'+item.src+'"></td',
                  '<td>'+item.type+'</td',
                  '<td>'+ item.count +'</td>',
                  '<td>'+ item.cost +'</td>',
                  '<td><button onclick="deleteElement('+item.id+')" >удалить</button></td>'];

    paramArray.forEach(function (element) {
       tr.insertAdjacentHTML("beforeEnd", element);
   });
   return tr;
}

//удаление 1-го элемента из корзины
function deleteElement(id) {
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    var newArray = [];
    for(var i=0;i<cartArray.length; i++){
        if(cartArray[i].id != id){
            newArray.push(cartArray[i]);
        }
    }
    localStorage.setItem('cart', JSON.stringify(newArray));
    initCart();
    viewCart();
}

//очистить корзину
function clearCart() {
    emptyArray = [];
    localStorage.setItem('cart', JSON.stringify(emptyArray));
    initCart();
    viewCart();
}

//отображение формы с заказом
function viewForm(status) {
    var form = document.getElementById('order_form');
    form.style.display = 'block';
    main = document.getElementById('main');
    document.body.insertBefore(form, main);
    formStatus = status;
}

//сделать заказ либо предзаказ
function makeOrder() {

    var countErrors = 0;
    phone = document.getElementById('userPhone');
    lastName = document.getElementById('lastName');
    firstName = document.getElementById('firstName');
    patronymic = document.getElementById('patronymic');
    city = document.getElementById('city');
    email = document.getElementById('email');

    phoneError = document.getElementById('userPhoneError');
    lastNameError = document.getElementById('lastNameError');
    firstNameError = document.getElementById('firstNameError');
    patronymicError = document.getElementById('patronymicError');
    cityError = document.getElementById('cityError');
    emailError = document.getElementById('emailError');


    if(phone.value.match( /\d{10}/)){
        phoneError.innerHTML="";
    }
    else {
        phoneError.innerHTML="Номер введен некоректно";
        countErrors++;
    }

    if(lastName.value.match(/[a-zA-Zа-яА-Я]{1,}/)){
        lastNameError.innerHTML ="";
    }
    else {
        lastNameError.innerHTML = "Фамилия ввeна не коректно";
        countErrors++;
    }

    if(firstName.value.match(/[a-zA-Zа-яА-Я]{1,}/)){
        firstNameError.innerHTML ="";
    }
    else {
        firstNameError.innerHTML = "Имя ввeно не коректно";
        countErrors++;
    }


    if(patronymic.value.match(/[a-zA-Zа-яА-Я]{1,}/)){
        patronymicError.innerHTML ="";
    }
    else {
        patronymicError.innerHTML = "Отчество ввeно не коректно";
        countErrors++
    }

    if(email.value.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/)){
        emailError.innerHTML ="";
    }
    else {
        emailError.innerHTML = "Не коректный емайл";
        countErrors++
    }

    if(countErrors==0) {
        var userData = {
            "phone": phone.value,
            "lastName": lastName.value,
            "firstName": firstName.value,
            "patronymic": patronymic.value,
            "city": city.value,
            "email": email.value
        }

        userData = JSON.stringify(userData);
        switch (formStatus) {
            case 'wishOrder':
                wishOrder(userData);
                break;
            case 'confirmOrderByEmail':
                confirmOrder(userData);
                break;
            default:
                alert('Ошибка отправки');
        }
    }

}

function wishOrder(userData) {
    $.ajax({
        type: "POST",
        url: "php/shopData.php",
        data: {
            wishOrder: true,
            items:localStorage.getItem('wish'),
            userInfo:userData
        },
        success: function (response) {
            if(response == true){
                alert('Заказ зделан успешно, на вашу почту было отправлено письмо');
                hideInStockOrder();
            }
            else alert('Ошибка выполнения заказа!!!');
        }
    })
}

function confirmOrder(userData) {
    $.ajax({
        type: "POST",
        url: "php/shopData.php",
        data: {
            confirmOrder: true,
            items: localStorage.getItem('cart'),
            userInfo:userData
        },
        success: function (response) {
            if(response == true){
                alert('Заказ зделан успешно, на вашу почту было отправлено письмо');
                hideInStockOrder();
                clearCart();
            }
            else alert('Ошибка выполнения заказа!!!');
        }
    })
}