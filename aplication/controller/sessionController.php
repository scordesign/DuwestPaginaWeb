<?php
require_once str_replace("controller", "service", str_replace("\\", "/", __DIR__)).'/sessionService.php';

class sessionController
{
    private $session;


    public function __construct()
    {
         $this->session = new sessionService();
    }

    public function getSession(): string
    {
        return $this->session->getSession();
    }
    
    public function destroySession(): String
    {
        return $this->session->destroySession();
    }
    


}
