<?php
class sessionService
{

    public function __construct()
    {
    }

    public function getSession(): string
    {
        if (isset($_SESSION['user'])) {
            $return = json_encode($_SESSION);
            return $return;
        }
        return "[]";
    }
    
    public function destroySession(): String
    {
        if (isset($_SESSION['user'])) {
            reset($_SESSION);
            session_destroy();
            return "true";
        }
        return "false";
    }
    


}
