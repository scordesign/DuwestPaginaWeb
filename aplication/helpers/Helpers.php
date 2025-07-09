<?php
final class Helpers
{
    public function __construct()
    {
    }

    public function convert_encoding_recursive($input)
    {
        if (is_array($input)) {
            // Aplicar la funci��n recursivamente a cada elemento del array
            return array_map(array($this, 'convert_encoding_recursive'), $input);
        } elseif (is_string($input)) {
            // Convertir la cadena a UTF-8
            return mb_convert_encoding($input, 'UTF-8', 'auto');
        }
        return $input;
    }




}
