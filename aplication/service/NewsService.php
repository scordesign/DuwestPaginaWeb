<?php
class NewsService
{


    public function __construct()
    {
    }

    public function deleteImg(): string
    {
        $returnFields = array();
        try {

            if (!isset($_SESSION['user'])) {
                $returnFields["status"] = 403;
                $returnFields["message"] = "Acceso denegado";
                $returnProduct = ($returnFields);
                
                return json_encode($returnProduct);
            }
            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();


            $id = $_POST["id"];
            $docName = $_POST["docName"];



            $consulta = "SELECT * FROM news WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los parámetros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
            $files = "";
            
            $files = $resultado['images'];
            


            $files = str_contains(str_replace("\\", "", $files), "\"" . $docName . "\"") ? str_replace("\"" . $docName . "\"", "", str_replace("\\", "", $files)) : $files;
            $files = str_contains($files, '[,') ? str_replace("[,", "[", $files) : $files;
            $files = str_ends_with($files, ',]') ? str_replace(",]", "]", $files) : $files;
            $files = str_contains($files, ',,') ? str_replace(",,", ",", $files) : $files;


            unlink(str_replace("/aplication/controller", "", str_replace("\\", "/", __DIR__)) . "/" . $docName);

            $sSql = "";

            $sSql = "update news set `images` = :files where `id` = :id ";
            

            $stmt = $pdo->prepare($sSql);

            $stmt->bindParam(':files', $files);
            $stmt->bindParam(':id', $id);


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


    public function editNew(): string
    {
        
        $returnFields = array();
        try {
            if (!isset($_SESSION['user'])) {
                $returnFields["status"] = 403;
                $returnFields["message"] = "Acceso denegado";
                $returnProduct = ($returnFields);
                
                return json_encode($returnProduct);
            }
            $filesNames = array();
            $imagesNames = array();


            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            $images = $_FILES["images"];

            if ($_POST["name"] === null) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "Nombre de noticia requerid";
                $return = json_encode($returnFields);
                return $return;
            }


            $id = $_POST["id"];
            $description = $_POST["description"] === null ? "" : $_POST["description"];
            $name = $_POST["name"] === null ? "" : $_POST["name"];
            $date = date("Y-m-d");



            $consulta = "SELECT * FROM news WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los parámetros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

            $imagesNamesString = str_replace("\\", "", $resultado['images']);
            if ($images !== null || !empty($images)) {
                
                $directoryimage = str_replace("/aplication/controller", "", str_replace("\\", "/", __DIR__)) . "/img/prueba/news";
                if (!is_dir($directoryimage)) {
                    // Crear la carpeta con permisos 0777 (lectura, escritura y ejecución para todos)
                    mkdir($directoryimage, 0777, true);

                    // Establecer permisos adicionales si es necesario
                    chmod($directoryimage, 0777);
                }
                foreach ($images["name"] as $key => $nombre) {
                    // Mover archivo al directorio deseado
                    if ($nombre != null || $nombre != "") {
                        $rutaArchivo = $directoryimage . "/" . basename($images["name"][$key]);
                        move_uploaded_file($images["tmp_name"][$key], $rutaArchivo);
                        // Agregar nombre del archivo a la lista
                        $imagesNames[] = /*$directoryimage .*/ "img/prueba/news/" . basename($images["name"][$key]);
                    }
                }
                $imagesNamesString = substr(str_replace("\\", "", json_encode($imagesNames)), 0, strlen(str_replace("\\", "", json_encode($imagesNames))) - 1) . "," . substr(str_replace("\\", "", $resultado['images']), 1);
                $imagesNamesString = str_contains($imagesNamesString, '[,') ? str_replace("[,", "[", $imagesNamesString) : $imagesNamesString;
                $imagesNamesString = str_ends_with($imagesNamesString, ',]') ? str_replace(",]", "]", $imagesNamesString) : $imagesNamesString;
                $imagesNamesString = str_contains($imagesNamesString, ',,') ? str_replace(",,", ",", $imagesNamesString) : $imagesNamesString;
            }




            $stmt = $pdo->prepare("update news set `name` =:name,`description` =:description,`images` =:listImg,`date` =:date where id =:id");


            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':listImg', $imagesNamesString);
            $stmt->bindParam(':date', $date);
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

    public function deleteNews(): string
    {
        $returnFields = array();
        $imgList = array();
        try {



            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();



            $id = $_POST["id"];




            $consulta = "SELECT * FROM news WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los parámetros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

            $imgList= json_decode(str_replace("\\", "", $resultado['images']), true);

            

            

            // $this->deletedirectory(str_replace("\aplication\controller", "", str_replace("/", "\\", __DIR__)) . "/img/prueba/".$resultado['name'] );

            // unlink(str_replace("\aplication\controller", "", str_replace("/", "\\", __DIR__)) . "/img/prueba/".$resultado['name'] );
            $s =""; 
            foreach ($imgList as $key => $value) {
                unlink(str_replace("\aplication\controller", "", str_replace("/", "\\", __DIR__)). "/"  .  $value);
             }
            // foreach ($fileList as $key => $value) {
            //     unlink(str_replace("\aplication\controller", "", str_replace("/", "\\", __DIR__)) . $value);
            // }

            

            $stmt = $pdo->prepare("delete from news  where id = :id");



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



    public function addNews(): string
    {
        $returnFields = array();
        try {
            $imagesNames = array();


            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            $images = $_FILES["images"];

            if ($_POST["name"] === null) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "titulo de notica requerida";
                $return = json_encode($returnFields);
                return $return;
            }



            $description = $_POST["description"] === null ? "" : $_POST["description"];
            $name = $_POST["name"] === null ? "" : $_POST["name"];
            $imagesNamesString = "[]";
            $currentDate = date("Y-m-d");

            if ($images !== null) {
                $directoryimage = str_replace("/aplication/controller", "", str_replace("\\", "/", __DIR__)) . "/img/prueba/news";

                if (!is_dir($directoryimage)) {
                    // Crear la carpeta con permisos 0777 (lectura, escritura y ejecución para todos)
                    mkdir($directoryimage, 0777, true);

                    // Establecer permisos adicionales si es necesario
                    chmod($directoryimage, 0777);
                }
                foreach ($images["name"] as $key => $nombre) {
                    if ($nombre != null || $nombre != "") {
                        // Mover archivo al directorio deseado
                        $rutaArchivo = $directoryimage . "/" . basename($images["name"][$key]);
                        move_uploaded_file($images["tmp_name"][$key], $rutaArchivo);
                        // Agregar nombre del archivo a la lista
                        $imagesNames[] = /*$directoryimage .*/ "img/prueba/news/" . basename($images["name"][$key]);
                    }
                }
                $imagesNamesString = json_encode($imagesNames);
            }



            $stmt = $pdo->prepare("INSERT INTO news (`name`,`description`,`images`,`date`) VALUES (:name,:description,:images,:date)");


            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':images', $imagesNamesString);
            $stmt->bindParam(':date', $currentDate);

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

    public function getnews(): string
    {
        $error ="";
        $returnFields = array();
        try {
            $page = !isset($_GET["page"]) ? 1 : $_GET["page"];
            $search = !isset($_GET["search"]) ? "" : $_GET["search"];


            $Ssql = "SELECT id,name, SUBSTR(description,1,250) as description,images,date FROM news where ";
            if ($search !== "") {
                $search = '%' . $search . '%';
                $Ssql .= "`name` like :name and ";
            }


            $Ssql = str_ends_with($Ssql, ' and ') ? substr($Ssql, 0, strlen($Ssql) - 4) : $Ssql;
            $Ssql = str_ends_with($Ssql, ' where ') ? substr($Ssql, 0, strlen($Ssql) - 6) : $Ssql;
            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            // count
            $statementCount = $pdo->prepare(str_replace(" id,name, SUBSTR(description,1,250) as description,images,date ", " count(*) as count ", $Ssql));

            if ($search !== "") {
                $statementCount->bindParam(':name', $search, PDO::PARAM_STR);
            }



            $statementCount->execute();

            $resultadoCount = $statementCount->fetchAll(PDO::FETCH_ASSOC);

            $count = $resultadoCount[0]["count"];


            // data
            $statement = $pdo->prepare($Ssql . " ORDER BY id DESC LIMIT 10 OFFSET " . ($page * 10) - 10);
            if ($search !== "") {
                $statement->bindParam(':name', $search, PDO::PARAM_STR);
            }
            
            $error = $Ssql. " LIMIT " . $page * 10 . " OFFSET 0" . ($page * 10) - 10;
            $statement->execute();
            $resultados = $statement->fetchAll(PDO::FETCH_ASSOC);
            $resultadosReturn = array();

            $i = 0;
            foreach ($resultados as $resultado) {
                $resultadosReturnEach = array();
                $resultadosReturnEach['images'] = json_decode($resultado['images'], true);
                $resultadosReturnEach['name'] = $resultado['name'];
                $resultadosReturnEach['description'] = $resultado['description'];
                $resultadosReturnEach['date'] = $resultado['date'];
                $resultadosReturnEach['id'] = $resultado['id'];
                $resultadosReturn[$i] = $resultadosReturnEach;
                $i++;
            }

            $returnFields["data"] = $resultadosReturn;
            $returnFields["Page"] = $page;
            $returnFields["Total"] = $count;
            $returnFields["status"] = 200;
            $returnFields["message"] = "Correcto" ;

            $returnNew = ($returnFields);


            return json_encode($returnNew);

        } catch (\Throwable $e) {
            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage()." - ".$e->getLine()." - ".$error;
            $returnNew = ($returnFields);


            return json_encode($returnNew);
        }
        // Iterar sobre el resultado
    }

    public function getNew(): string
    {
        $returnFields = array();
        try {
            $id = !isset($_GET["id"]) ? 0 : $_GET["id"];

            $Ssql = "select * from news where id= :id";


            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            $statement = $pdo->prepare($Ssql);

            $statement->bindParam(':id', $id, PDO::PARAM_INT);




            $statement->execute();
            $resultados = $statement->fetchAll(PDO::FETCH_ASSOC);
            $resultadosReturn = array();

            foreach ($resultados as $resultado) {
                $resultadosReturn = array();
                $resultadosReturn['images'] = json_decode($resultado['images'], true);
                $resultadosReturn['name'] = $resultado['name'];
                $resultadosReturn['description'] = $resultado['description'];
                $resultadosReturn['date'] = $resultado['date'];
                $resultadosReturn['id'] = $resultado['id'];
            }

            $returnFields["data"] = $resultadosReturn;

            $returnFields["status"] = 200;
            $returnFields["message"] = "Correcto";

            $returnNew = ($returnFields);


            return json_encode($returnNew);

        } catch (\Throwable $e) {
            $returnFields["status"] = 500;
            $returnFields["message"] = $e;

            $returnNew = ($returnFields);


            return json_encode($returnNew);
        }
        // Iterar sobre el resultado
    }
}
?>