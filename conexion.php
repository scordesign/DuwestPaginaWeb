<?php
require_once 'aplication/connection/connection.php';

$c = new Conexion();
$db = $c->obtenerConexion();

echo "✅ Conexión exitosa.";