<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="description" content="123123123"/>
    <meta name="keywords" content="321123321123"/>
    <title>MLP_OD</title>
    <link rel="icon" href="images/mark.png"/>
    <!--бутстрап-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css" media="screen"/>
    <script type="text/javascript" src="js/ajax.js"></script>
</head>
<body>

<!--<audio autoplay loop>-->
<!--    <source src="test.mp3" type="audio/mpeg">-->
<!--    Тег audio не поддерживается вашим браузером.-->
<!--</audio>-->
<div id="main">

    <!-- форма заказа товара которого нет в наличии -->
    <div id="order_form">
        <form action="" method="post">
            <table id="orderTable">
                <tr>
                    <td><label>Телефон</label></td>
                    <td><input id="userPhone" type="tel" pattern="[0-9]{10}" placeholder="0963423185" required/></td>
                    <td> <label id="userPhoneError" class="errorText"></label></td>
                </tr>

                <tr>
                    <td><label>Фамилия</label></td>
                    <td><input id="lastName" type="text"  required/></td>
                    <td> <label id="lastNameError" class="errorText"></label></td>
                </tr>
                <tr>
                    <td><label>Имя</label></td>
                    <td><input type="text" id="firstName" required/></td>
                    <td> <label id="firstNameError" class="errorText"></label></td>
                </tr>
                <tr>
                    <td><label>Отчество</label></td>
                    <td><input type="text" id="patronymic" required/>
                    <td> <label id="patronymicError" class="errorText"></label></td>
                </tr>
                <tr>
                    <td><label>Город</label></td>
                    <td><select id="city" style="border: 1px solid grey; width: 150px; height: 24px;">
                            <option value="Одесса">Одесса</option>
                            <option value="Киев">Киев</option>
                            <option value="Харьков">Харьков</option>
                            <option value="Днепр">Днепр</option>
                            <option value="Львов">Львов</option>
                            <option value="Николаев">Николаев</option>
                            <option value="Запорожье">Запорожье</option>
                            <option value="Винница">Винница</option>
                            <option value="Херсон">Херсон</option>
                            <option value="Полтава">Полтава</option>
                            <option value="Другой город Украины">Другой город Украины</option>
                        </select></td>
                </tr>
                <tr>
                    <td><label>Почта</label></td>
                    <td><input type="email" id="email" required/>
                    <td> <label id="emailError" class="errorText"></label></td>
                </tr>

            </table>

            <br>
            <div id="formButtons">
                <input id="submitOrder" type="button" onclick="makeOrder()" value="сделать заказ"/>
                <input id="cancelOrder" type="button" value="отмена" onclick="hideInStockOrder()"/>
            </div>
        </form>
    </div>
    <!--конец блока с формой -->


    <div id="header">
        <div id="menu">
            <a href="/" onclick="pageLoad('/')" >Домой</a>
            <a href="/contact.html" >Контакты</a>
            <div id="cartBlock">
                <a href="/shop_lobby.php">Магазин</a>
                <a href="/cart.html">
                    <img src="images/cart.png" width="30" height="30">
                    <span id="cart"></span>
                </a>
            </div>
            <a href="index.html">События</a>
            <a href="/about_us.html">О Нас</a>
            <a href="/database.php">База данных</a>
        </div>
        <div class="clear"></div>
    </div>
    <div class="clear"></div>

    <div id="mainContent">
        <?php
        $url = $_SERVER['REQUEST_URI'];

        if (strripos($url, "?")) {
            $path = explode("?", $url);
            $url = $path[0];
        }
        if ($url == '/')
            include('cat/home.html');
        else
            include('cat/' . $url);

        ?>
    </div>

</div>

<script src="js/cart.js"></script>
<script src="js/shop.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>

