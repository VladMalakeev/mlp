<?php
include 'php/shopData.php';
if (isset($_GET['item'])) {
    $itemLink = $_GET['item'];
    $item = getTypeItem($itemLink);
}
?>

<script>
    //выводим весь товар на экран
    document.addEventListener("DOMContentLoaded", function () {
        getWish(<?php echo $itemLink ?>);
        getInStock(<?php echo $itemLink ?>);
    });
</script>




<div id="shop_lobby_content">

    <h1 id="sign" data-type=" <?php echo $item['type_name'] ?>">
        <?php
        echo $item['type_name'];
        ?>
    </h1>

    <div id="property">
        <div id="current_image"></div>
        <button id="makeOrder" onclick="clickBtnOrder()"></button>
    </div>

    <div id="inStock_hub" style="float:left; width:275px; margin:0 0 0 20px;">
        <h2 align="center" id="itemCost" data-cost="<?php echo $item['cost']; ?>">
            Цена <?php echo $item['cost']; ?> грн.
        </h2>
        <div id="inStock" style="width:275px; height:400px; border:1px solid black; background-color:white;"></div>
        <div id="inStockButton" style="margin: 3px auto; display: table;">
            <button onclick="prevButtonInStock()" id="inStockPrev"></button>
            <button onclick="nextButtonInStock()" id="inStockNext"></button>
        </div>
    </div>


    <div class="clear"></div>

    <div id="wish" style="float:left; width:525px; height:160px; margin:10px 0 0 20px;"></div>

    <div id="wishButtons" style="margin:35px 3px 3px 3px; float:left; display: table;">
        <button onclick="prevButtonWish()" id="wishPrev"></button>
        <div class="clear"></div>
        <button onclick="nextButtonWish()" id="wishNext"></button>
    </div>

    <div class="clear"></div>
    <a href="shop_lobby.php"
       style="float:right; padding:15px; background-color:red; color:white; text-decoration: none; margin:15px 36px 12px 12px;">Вернуться</a>
    <div class="clear"></div>
</div>

