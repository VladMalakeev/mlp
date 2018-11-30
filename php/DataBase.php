<?php
class DataBase
{
private static $instance = null;

private function __construct(){}

public static function getInstance(){
    if(self::$instance==null){
        $host = 'localhost';
        $db = 'greenlightshadow';
        $user = 'greenlightshadow';
        $pass = 'QUantum0451';
        $charset = 'utf8';
        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        self::$instance = new PDO($dsn, $user, $pass);
    }
    return self::$instance;
}
}




