<?php
require_once str_replace("controller", "service", __DIR__).'\FilterService.php';
class FiltersController
{
    private $Filters ;

    
    public function __construct()
    {
        $this->Filters = new Filters();
    }
 

    public function getFilters(): String
    {
        return $this->Filters->getFilters();
    }

    public function editFilter(): string
    {
        return $this->Filters->editFilter();        // Iterar sobre el resultado
    }

    public function deleteFilter(): string
    {
        return $this->Filters->deleteFilter();        // Iterar sobre el resultado
        // Iterar sobre el resultado
    }



    public function addFilter(): string
    {
        return $this->Filters->addFilter();        // Iterar sobre el resultado
        // Iterar sobre el resultado
    }
}
