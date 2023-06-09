<?php

session_start();

require '../src/config/config.php';
require '../vendor/autoload.php';
require SRC . 'helper.php';

$router = new Ruben\Router($_SERVER["REQUEST_URI"]);
//Index of the webPage
$router -> get('/:id', "RubenController@index"); // Page accueil

$router -> post('/example', "RubenController@example"); // Example Post;
$router->run();