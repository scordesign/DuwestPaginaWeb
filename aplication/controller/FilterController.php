<?php

class Filters
{
    public function __construct()
    {
    }

    private function convert_encoding_recursive($input)
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

    public function getFilters(): String
    {
        $returnFields = array();
        try {
            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            $statement = $pdo->prepare("SELECT category FROM filters group by category ORDER BY category asc ");
            $statement->execute();

            $resultado = $statement->fetchAll(PDO::FETCH_ASSOC);

            $categorysFilters = array();

            foreach ($resultado as $category) {
                $statementIn = null;
                $resultadoIn = null;
                $statementIn = $pdo->prepare("SELECT * FROM filters where `category` = :category ORDER BY name asc ");
                $statementIn->bindParam(':category', $category['category'], PDO::PARAM_STR);
                $statementIn->execute();
                $resultadoIn = $statementIn->fetchAll(PDO::FETCH_ASSOC);
                $categorysFilters[$category['category']] = $resultadoIn;
            }

            $returnFields["data"] = $categorysFilters;
            $returnFields["status"] = 200;
            $returnFields["message"] = "correcto";

            $returnFields = $this->convert_encoding_recursive($returnFields);
            $returnProduct = json_encode($returnFields);


            return $returnProduct;
        } catch (\Throwable $e) {
            echo var_dump($e);
            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();

            $returnProduct = json_encode($returnFields);

            return $returnProduct;
        }
    }

    public function editFilter(): string
    {
        $returnFields = array();
        try {


            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();


            if ($_POST["name"] === null) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "Nombre de filtro requerido";
                $return = json_encode($returnFields);
                return $return;
            }


            $id = $_POST["id"];
            $category = $_POST["category"] === null ? $_POST["categoryOther"] === null ? "" : $_POST["categoryOther"] : $_POST["category"];
            $name = $_POST["name"] === null ? "" : $_POST["name"];
            $color = $_POST["color"] === null ? "" : $_POST["color"];
            $text = $_POST["text"] === null ? "" : $_POST["text"];



            $consulta = "SELECT * FROM filters WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los par��metros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];





            $stmt = $pdo->prepare("update filters set `name` =:name,`category` =:category, `color` =:color,  `text` =:text where id =:id");


            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':category', $category);
            $stmt->bindParam(':color', $color); 
            $stmt->bindParam(':text', $text); 
            $stmt->bindParam(':id', $id);
            // Ejecutar la sentencia SQL con los valores correspondientes
            $stmt->execute();



            $returnFields["status"] = 200;
            $returnFields["message"] = "Editado correctamente";

            $returnNew = ($returnFields);


            return json_encode($returnNew);

        } catch (\Throwable $e) {
            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();

            $returnNew = ($returnFields);


            return json_encode($returnNew);
        }
        // Iterar sobre el resultado
    }

    public function deleteFilter(): string
    {
        $returnFields = array();
        try {



            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();



            $id = $_POST["id"];




            $consulta = "SELECT * FROM filters WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los par��metros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

            

            $stmt = $pdo->prepare("delete from filters where id = :id");



            $stmt->bindParam(':id', $id);
            // Ejecutar la sentencia SQL con los valores correspondientes
            $stmt->execute();



            $returnFields["status"] = 200;
            $returnFields["message"] = "Eliminado correctamente";

            $returnNew = ($returnFields);


            return json_encode($returnNew);

        } catch (\Throwable $e) {
            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();

            $returnNew = ($returnFields);


            return json_encode($returnNew);
        }
        // Iterar sobre el resultado
    }



    public function addFilter(): string
    {
        $returnFields = array();
        try {


            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();


            if ($_POST["name"] === null) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "titulo de notica requerida";
                $return = json_encode($returnFields);
                return $return;
            }

            

            $category = !isset($_POST["category"]) ? ($_POST["categoryOther"] === null ? "" : $_POST["categoryOther"] ): $_POST["category"];
            $name = $_POST["name"] === null ? "" : $_POST["name"];
            $color = $_POST["color"] === null ? "" : $_POST["color"]; 
            $color = $_POST["text"] === null ? "" : $_POST["text"]; 






            $stmt = $pdo->prepare("INSERT INTO filters (`name`,`category`, 'color', 'text' ) VALUES (:name,:category, :color, :text)");


            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':category', $category);
            $stmt->bindParam(':color', $color);
            $stmt->bindParam(':text', $text);



            // Ejecutar la sentencia SQL con los valores correspondientes
            $stmt->execute();



            $returnFields["status"] = 200;
            $returnFields["message"] = "Registrado correctamente";

            $returnNew = ($returnFields);


            return json_encode($returnNew);

        } catch (\Throwable $e) {
            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();

            $returnNew = ($returnFields);


            return json_encode($returnNew);
        }
        // Iterar sobre el resultado
    }
}
