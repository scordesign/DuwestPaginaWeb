<?php
require_once str_replace("controller", "service", str_replace("\\", "/", __DIR__)).'/ProductsService.php';


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

        $allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

foreach ($_FILES as $fileGroup) {
    if (is_array($fileGroup['name'])) {
        // Múltiples archivos
        for ($i = 0; $i < count($fileGroup['name']); $i++) {
            $fileName = $fileGroup['name'][$i];
            $fileTmp = $fileGroup['tmp_name'][$i];
            $fileType = mime_content_type($fileTmp);
            $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

            if (!in_array($fileType, $allowedMimeTypes) || !in_array($fileExt, $allowedExtensions)) {
                http_response_code(400);
                echo json_encode([
                    'status' => 400,
                    'message' => "Archivo no permitido: $fileName"
                ]);
                exit;
            }
        }
    } else {
        // Un solo archivo
        $fileName = $fileGroup['name'];
        $fileTmp = $fileGroup['tmp_name'];
        $fileType = mime_content_type($fileTmp);
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        if (!in_array($fileType, $allowedMimeTypes) || !in_array($fileExt, $allowedExtensions)) {
            http_response_code(400);
            echo json_encode([
                'status' => 400,
                'message' => "Archivo no permitido: $fileName"
            ]);
            exit;
        }
    }
}

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