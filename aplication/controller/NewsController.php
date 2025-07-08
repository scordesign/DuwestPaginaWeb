<?php
require_once str_replace("controller", "service", __DIR__).'\NewsService.php';
class NewsController
{
    private $News;


    public function __construct()
    {
        $this->News = new News();
    }

    public function deleteImg(): string
    {
        return $this->News->deleteImg();
    }


    public function editNew(): string
    {
        return $this->News->editNew();        // Iterar sobre el resultado
    }

    public function deleteNews(): string
    {
        return $this->News->deleteNews();        // Iterar sobre el resultado
    }



    public function addNews(): string
    {
        return $this->News->addNews();        // Iterar sobre el resultado
    }

    public function getnews(): string
    {
        return $this->News->getnews();        // Iterar sobre el resultado
    }

    public function getNew(): string
    {
        return $this->News->getNew();        // Iterar sobre el resultado
    }
}
?>