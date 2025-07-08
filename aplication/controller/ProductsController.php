<?php
require_once str_replace("controller", "service", str_replace("/", "\\", __DIR__)).'\ProductsService.php';


class ProductsController
{
    private $Products;

    public function __construct()
    {
        $this->Products = new ProductsService();
    }


    public function deleteDocs(): string
    {
        return $this->Products->deleteDocs();
    }

    public function updateDocs(): string
    {
        return $this->Products->updateDocs();
    }



    public function editProducts(): string
    {
        return $this->Products->editProducts();
    }

    public function deleteProducts(): string
    {
        return $this->Products->deleteProducts();
    }


    public function addProducts(): string
    {
        return $this->Products->addProducts();
    }

    public function getProducts(): string
    {
        return $this->Products->getProducts();
    }

    public function getProduct(): string
    {
        return $this->Products->getProduct();
    }
}
?>