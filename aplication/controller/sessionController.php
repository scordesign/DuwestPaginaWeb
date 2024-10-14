<?php
class session
{

    public function __construct()
    {
    }

    function getSession(): string
    {
        
        if (session_status() != PHP_SESSION_NONE) {
            $return = json_encode($_SESSION);
            echo $return;
            return $return;
        }
        return "";
    }
    
    function destroySession(): String
    {
        if (session_status() != PHP_SESSION_NONE) {
            reset($_SESSION);
            session_destroy();
            return "true";
        }
        return "false";
    }
    


}
