<?php
require_once str_replace("controller", "service", str_replace("/", "\\", __DIR__)).'\UserService.php';

class usersController
{

    private $users;

    public function __construct()
    {
        $this->users = new usersService();
    }

    public function LogUser(): string
    {
        return $this->users->LogUser();
    }

    public function RegisterUser(): string
    {
        return $this->users->RegisterUser();
    }



    public function getUsers(): string
    {
        return $this->users->getUsers();
    }

    public function editUser(): string
    {
        return $this->users->editUser();
        // Iterar sobre el resultado
    }

    public function deleteUser(): string
    {
        return $this->users->deleteUser();
        // Iterar sobre el resultado
    }




}
