
<?php
include 'php/shopData.php';
?>

	<div id="shop_lobby_content">
	<h1 style="text-align:center;">Выберите категорию товара</h1>
        <?php
        foreach(getListTypeSupplies() as $item){
                ?>
				<div style="padding:5px;">
                <div class="data_type">
                    <img src="database_type/<?php echo $item['image'] ?>">
                    <h1><?php echo $item['type_name'] ?></h1>
                    <a href="shoplist.php?item=<?php echo $item['id']; ?>">Образцы</a>
                    <div class="clear"></div>
                </div>
				</div>
                <?php
                }
                  ?>
	</div>


