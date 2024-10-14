<?php
class returnModel {
    private $status;
    private $data;
    private $mesage;

    public function __construct($status, $data,$mesage) {
        $this->status = $status;
        $this->data = $data;
        $this->mesage = $mesage;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getData() {
        return $this->data;
    }

    public function setData($data) {
        $this->data = $data;
    }
    public function getMesage() {
        return $this->mesage;
    }

    public function setMesage($mesage) {
        $this->mesage = $mesage;
    }
}