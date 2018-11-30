<?php
include 'DataBase.php';

if(isset($_POST['getChar'])){
	$json = json_encode(getListCharacters());
	echo $json;
}

function getListCharacters(){
    $db = DataBase::getInstance();
    $sql = "SELECT * FROM characters order by name";
    $result = $db->query($sql);
    while($character = $result->fetch(PDO::FETCH_ASSOC)){
        $characterArray[] = $character;
    }
    return $characterArray;
}


function getCharactersData($id){
    $db = DataBase::getInstance();
    $sql = "SELECT name, rase, image, info, facts FROM characters WHERE id ='$id' ";
    $result = $db->query($sql);
    $character = $result->fetch(PDO::FETCH_LAZY);
    return $character;

}

function getRase($id){
    $db = DataBase::getInstance();
    $sql = "SELECT * FROM rases WHERE id='$id'";
    $result = $db->query($sql);
    $rase = $result->fetch(PDO::FETCH_LAZY);
    return $rase['rase_name'];
}