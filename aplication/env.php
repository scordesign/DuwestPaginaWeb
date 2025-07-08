<?php
function cargarEnv($ruta) {
    if (!file_exists($ruta)) return;
    foreach (file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $linea) {
        if (strpos(trim($linea), '#') === 0) continue;
        list($clave, $valor) = explode('=', $linea, 2);
        $_ENV[trim($clave)] = trim($valor);
    }
}

cargarEnv(__DIR__ . '/../.env');