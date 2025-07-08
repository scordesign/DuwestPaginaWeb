<?php
require_once str_replace("controller", "service", __DIR__).'\sessionService.php';

class sessionController
{
    private $session;


    public function __construct()
    {
         $this->session = new session();
    }

    function getSession(): string
    {
        return $this->session->getSession();
    }
    
    function destroySession(): String
    {
        return $this->session->destroySession();
    }
    


}
