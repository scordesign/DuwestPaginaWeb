<?php
class Conexion {
    //mac
     private $host = 'localhost';
     private $usuario = 'root';
     private $contrasena = '';
     private $nombre_bd = 'duwest';

    private $conexion;

    public function __construct() {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->nombre_bd};charset=utf8mb4";
            $opciones = array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            );
            $this->conexion = new PDO($dsn, $this->usuario, $this->contrasena, $opciones);
        } catch (PDOException $e) {
            echo "Error de conexion: " . $e->getMessage();
            die();
        }
    }

    public function obtenerConexion() {
        return $this->conexion;
    }
}
?>