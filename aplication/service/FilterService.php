<?php

require_once str_replace("service", "helpers", __DIR__).'\Helpers.php';

class Filters
{
    private $Helpers;

    public function __construct()
    {
        $this->Helpers = new Helpers();

    }


    public function getFilters(): String
    {
        $returnFields = array();
        try {
            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            $statement = $pdo->prepare("SELECT category FROM filters group by category ORDER BY category desc ");
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

            $returnFields = $this->Helpers->convert_encoding_recursive($returnFields);
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
            $text = !isset($_POST["text"]) ? "" : $_POST["text"];
            $module = $_POST["module"] === null ? "" : $_POST["module"];




            $consulta = "SELECT * FROM filters WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los par��metros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];





            $stmt = $pdo->prepare("update filters set `name` =:name,`category` =:category, `color` =:color,  `text` =:text,  `module` =:module where id =:id");


            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':category', $category);
            $stmt->bindParam(':color', $color); 
            $stmt->bindParam(':text', $text); 
            $stmt->bindParam(':module', $module); 
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
        $sSql="";
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
            $text = !isset($_POST["text"]) ? "" : $_POST["text"];
            $module = $_POST["module"] === null ? "" : $_POST["module"]; 



            


            $stmt = $pdo->prepare("INSERT INTO filters (`name`,`category`, `color`, `text` , `module` ) VALUES (:name, :category, :color, :text, :module)");


            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':category', $category);
            $stmt->bindParam(':color', $color);
            $stmt->bindParam(':text', $text);
            $stmt->bindParam(':module', $module);




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
