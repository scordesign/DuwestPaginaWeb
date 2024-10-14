<?php
class Amounts
{


    public function __construct()
    {
    }

    public function getAmounts(): string
    {
        $resultado = array();
        try {
            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            $statement = $pdo->prepare("SELECT * FROM amount");
            $statement->execute();

            $resultado = $statement->fetchAll(PDO::FETCH_ASSOC);

            $returnFields["data"] = $resultado;
            $returnFields["status"] = 200;
            $returnFields["message"] = "correcto";

            $returnProduct = json_encode($returnFields);


            return json_encode($returnProduct);
        } catch (\Throwable $e) {
            
            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();
            $returnProduct = json_encode($returnFields);
            
            return json_encode($returnProduct);
        }
        // Iterar sobre el resultado
    }

    public function editAmount(): string
    {
        $returnFields = array();
        try {


            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();


            if ($_POST["name"] === null) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "Nombre de cantidad requerido.";
                $return = json_encode($returnFields);
                return $return;
            }


            $id = $_POST["id"];
            $name = $_POST["name"] === null ? "" : $_POST["name"];
            $image = $_FILES["image"];




            $consulta = "SELECT * FROM amount WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los parámetros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

            $imagepatch = $resultado["patch"] == null ? "" : $resultado["patch"];

            // var_dump($image);

            if (($image["name"] == null ?"": $image["name"]) !== "" ) {
                if ($imagepatch !== "") {
                    unlink(str_replace("/aplication/controller", "", str_replace("\\", "/", __DIR__)) . "/" . $imagepatch);
                }
                $directoryimage = str_replace("/aplication/controller", "", str_replace("\\", "/", __DIR__)) . "/img/amounts";
                if (!is_dir($directoryimage)) {
                    // Crear la carpeta con permisos 0777 (lectura, escritura y ejecución para todos)
                    mkdir($directoryimage, 0777, true);

                    // Establecer permisos adicionales si es necesario
                    chmod($directoryimage, 0777);
                }
                $rutaArchivoimage = "";

                if ($image !== null) {
                    // Mover archivo al directorio deseado
                    $rutaArchivoimage = $directoryimage . "/" . basename($image["name"]);
                    move_uploaded_file($image["tmp_name"], $rutaArchivoimage);
                    $imagepatch = "img/amounts/" . basename($image["name"]);
                    // Agregar nombre del archivo a la lista
                }
            }



            $stmt = $pdo->prepare("update amount set `name` =:name, `patch` =:patch where id =:id");


            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':patch', $imagepatch);
            $stmt->bindParam(':id', $id);
            // Ejecutar la sentencia SQL con los valores correspondientes
            $stmt->execute();



            $returnFields["status"] = 200;
            $returnFields["message"] = "Editado correctamente";

            $returnNew = json_encode($returnFields);


            return json_encode($returnNew);

        } catch (\Throwable $e) {
            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();

            $returnNew = json_encode($returnFields);


            return json_encode($returnNew);
        }
        // Iterar sobre el resultado
    }

    public function deleteAmount(): string
    {
        $returnFields = array();
        try {



            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();



            $id = $_POST["id"];




            $consulta = "SELECT * FROM amount WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los parámetros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];


            if (($resultado["patch"] === null ?"":$resultado["patch"] ) != "" ) {
                unlink(str_replace("/aplication/controller", "", str_replace("\\", "/", __DIR__)) ."/". $resultado["patch"]);
            }
            

            $stmt = $pdo->prepare("delete from amount where id = :id");



            $stmt->bindParam(':id', $id);
            // Ejecutar la sentencia SQL con los valores correspondientes
            $stmt->execute();



            $returnFields["status"] = 200;
            $returnFields["message"] = "Eliminado correctamente";

            $returnNew = json_encode($returnFields);


            return json_encode($returnNew);

        } catch (\Throwable $e) {
            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();

            $returnNew = json_encode($returnFields);


            return json_encode($returnNew);
        }
        // Iterar sobre el resultado
    }



    public function addAmount(): string
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

            

            $name = $_POST["name"] === null ? "" : $_POST["name"];
            $image = $_FILES["image"];

            $directoryimage = str_replace("/aplication/controller", "", str_replace("\\", "/", __DIR__)) . "/img/amounts";

            if (!is_dir($directoryimage)) {
                // Crear la carpeta con permisos 0777 (lectura, escritura y ejecución para todos)
                mkdir($directoryimage, 0777, true);

                // Establecer permisos adicionales si es necesario
                chmod($directoryimage, 0777);
            }
            $rutaArchivoimage = "";
            $imagepatch = "";
            if ($image !== null) {
                // Mover archivo al directorio deseado
                $rutaArchivoimage = $directoryimage . "/" . basename($image["name"]);
                move_uploaded_file($image["tmp_name"], $rutaArchivoimage);
                $imagepatch = "img/amounts/" . basename($image["name"]);
                // Agregar nombre del archivo a la lista
            }



            $stmt = $pdo->prepare("INSERT INTO amount (`name`,`patch`) VALUES (:name,:patch)");


            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':patch', $imagepatch);

            // Ejecutar la sentencia SQL con los valores correspondientes
            $stmt->execute();



            $returnFields["status"] = 200;
            $returnFields["message"] = "Registrado correctamente";

            $returnNew = json_encode($returnFields);


            return json_encode($returnNew);

        } catch (\Throwable $e) {
            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();

            $returnNew = json_encode($returnFields);


            return json_encode($returnNew);
        }
        // Iterar sobre el resultado
    }

}
