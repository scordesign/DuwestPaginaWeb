<?php
session_start();
require_once __DIR__ . '/../vendor/autoload.php';
require_once 'controller/ProductsController.php';
require_once 'controller/UserController.php';
require_once 'controller/FilterController.php';
require_once 'controller/sessionController.php';
require_once 'controller/NewsController.php';
require_once 'controller/AmountsController.php';
require_once 'connection/Connection.php';

$users = new usersController();
$Products = new ProductsController();
$news = new NewsController();
$Filters = new FiltersController();
$session = new sessionController();
$Amounts = new AmountsController();

switch (strtolower($_SERVER["REQUEST_METHOD"])) {
    case "post":

        switch ($_POST["action"]) {
            case "RegiterUser":
                echo $users->RegisterUser();
                break;
            case "LoggingUser":
                echo $users->LogUser();
                break;
            case "addProduct":
                echo $Products->addProducts();
                break;
            case "deleteDocsPro":
                echo $Products->deleteDocs();
                break;
            case "UpdateDocsPro":
                echo $Products->updateDocs();
                break;
            case "editProducts":
                echo $Products->editProducts();
                break;
            case "deleteProducts":
                echo $Products->deleteProducts();
                break;
            case "addNews":
                echo $news->addNews();
                break;
            case "deleteImg":
                echo $news->deleteImg();
                break;
            case "editNews":
                echo $news->editNew();
                break;
            case "deleteNews":
                echo $news->deleteNews();
                break;
            case "addFilter":
                echo $Filters->addFilter();
                break;
            case "editFilter":
                echo $Filters->editFilter();
                break;
            case "deleteFilter":
                echo $Filters->deleteFilter();
                break;
            case "addAmount":
                echo $Amounts->addAmount();
                break;
            case "editAmount":
                echo $Amounts->editAmount();
                break;
            case "deleteAmount":
                echo $Amounts->deleteAmount();
                break;
            case "editUser":
                echo $users->editUser();
                break;
            case "deleteUser":
                echo $users->deleteUser();
                break;
        }
        break;
    case "get":
        switch ($_GET["action"]) {
            case "getSession":
                echo $session->getSession();
                break;
            case "destroySession":
                echo $session->destroySession();
                break;
            case "getfilters":
                echo $Filters->getFilters();
                break;
            case "getProducts":
                echo $Products->getProducts();
                break;
            case "getProduct":
                echo $Products->getProduct();
                break;
            case "getNews":
                echo $news->getnews();
                break;
            case "getNew":
                echo $news->getNew();
                break;
            case "getAmounts":
                echo $Amounts->getAmounts();
                break;
            case "getUsers":
                echo $users->getUsers();
                break;
        }

        break;
}



