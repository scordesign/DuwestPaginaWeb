<?php
require_once str_replace("controller", "service", str_replace("/", "\\", __DIR__)).'\AmountsService.php';

class AmountsController
{

    private $Amounts;
      
    public function __construct()
    {
        $this->Amounts = new AmountsService();
    }

    public function getAmounts(): string
    {
        return $this->Amounts->getAmounts();
    }

    public function editAmount(): string
    {
        return $this->Amounts->editAmount();        // Iterar sobre el resultado
    }

    public function deleteAmount(): string
    {
        return $this->Amounts->deleteAmount();        // Iterar sobre el resultado
    }



    public function addAmount(): string
    {
        return $this->Amounts->addAmount();        // Iterar sobre el resultado
    }

}
