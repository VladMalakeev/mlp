 <?php
    include 'php/charactersData.php';
    if(isset($_GET['character'])) {
        $character = getCharactersData($_GET['character']);
    ?>
	<div id="char_content">
				<div id="imagination">
					<img src="../database_char/<?php echo $character['image']?>">
					<h2 id="rase"><?php
                       echo  getRase($character['rase']) ?></h2>
				</div>
				<h1>
                    <?php echo $character['name']?>
                </h1>

			    <div class="clear"></div>

                <h4 id="info">
                    <?php
                    if($info = @file_get_contents("../intel/".$character['info'])){
                        echo $info;
                    }
                    else echo 'нет инфорации';

                    ?>
                </h4>

                <ul id="facts"><?php
                     if($fasts = @file_get_contents("../facts/".$character['facts'])){
                        echo $fasts;
                    }
                    else echo "нет фактов";
                    ?></ul>
                <a href="database.php">Вернуться</a>
                <div class="clear"></div>
	</div>
    <?php
    }
    else{
        echo 'нет данных о поняшках';
    }
    ?>
