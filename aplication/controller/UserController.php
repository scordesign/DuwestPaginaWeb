<?php
class users
{


    public function __construct()
    {
    }

    public function LogUser(): string
    {
        $returnFields = array();

        try {

            $user = ($_POST["user"] === null) ? "" : $_POST["user"];
            $password = ($_POST["password"] === null) ? "" : $_POST["password"];


            if ($user == "" || $password == "") {
                $returnFields["status"] = 406;
                $returnFields["message"] = "usuario y contraseña requerida";

                $returnUsuario = json_encode($returnFields);
                return $returnUsuario;

            }



            // Crear una instancia de la clase PDO
            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            // Consulta SQL
            $consulta = "SELECT * FROM users WHERE user = :user or mail = :user ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los parámetros (en este caso, solo uno)

            $stmt->bindParam(':user', $user, PDO::PARAM_STR);

            // Ejecutar la consulta
            $stmt->execute();

            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

            $resultado['user'];

            // Procesar los resultados
            if ($resultado['user'] == null) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "Usuario no registrado";

                $returnUsuario = json_encode($returnFields);
                return $returnUsuario;

            }


            $passwordEncrypt = hash('sha256', $resultado['key'] . $password);

            if ($passwordEncrypt !== $resultado['password']) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "Contraseña incorrecta";

                $returnUsuario = json_encode($returnFields);
                return $returnUsuario;
            }



            $returnFields["status"] = 200;
            $returnFields["message"] = "ingreso correcto";

            $_SESSION['user'] = $resultado['user'];
            $_SESSION['name'] = $resultado['name'];
            $_SESSION['mail'] = $resultado['mail'];
            $_SESSION['adminUser'] = boolval($resultado['adminUser']);
            $_SESSION['started'] = true;


            $returnUsuario = json_encode($returnFields);
            return $returnUsuario;

        } catch (\Throwable $e) {

            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();

            $returnUsuario = json_encode($returnFields);
            return $returnUsuario;
        }
    }

    public function RegisterUser(): string
    {
        $returnFields = array();

        try {

            $mail = ($_POST["mail"] === null) ? "" : $_POST["mail"];
            $user = ($_POST["user"] === null) ? "" : $_POST["user"];
            $name = ($_POST["name"] === null) ? "" : $_POST["name"];
            $password = ($_POST["password"] === null) ? "" : $_POST["password"];
            $comfirm = $_POST["comfirm"] === null ? "" : $_POST["comfirm"];

            if ($password != $comfirm) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "Contraseñas no coinciden";

                $returnNew = json_encode($returnFields);


                return json_encode($returnNew);
            }


            if ($mail == "" || $password == "") {
                $returnFields["status"] = 406;
                $returnFields["message"] = "correo electronico y contraseña requerida";

                $returnUsuario = json_encode($returnFields);
                return $returnUsuario;
            }

            $user = ($_POST["user"] == "") ? $_POST["mail"] : $_POST["user"];

            // Crear una instancia de la clase PDO
            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            // Consulta SQL
            $consulta = "SELECT * FROM users WHERE user = :user and mail = :mail";
            $error = "SELECT * FROM users WHERE user = " . $user . " and mail = " . $mail;
            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los parámetros (en este caso, solo uno)

            $stmt->bindParam(':user', $user, PDO::PARAM_STR);
            $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);

            // Ejecutar la consulta
            $stmt->execute();

            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Procesar los resultados
            if (sizeof($resultado) > 0) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "Usuario o correo electronico repetido";

                $returnUsuario = json_encode($returnFields);
                return $returnUsuario;

            }


            // Preparar la sentencia SQL de inserción
            $stmt = $pdo->prepare("INSERT INTO users (`mail`, `user`,`name`,`password`,`key`) VALUES (:mail , :user , :name , :password , :sal )");



            $sal = bin2hex(random_bytes(16));

            $passwordEncrypt = hash('sha256', $sal . $password);

            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':user', $user);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':password', $passwordEncrypt);
            $stmt->bindParam(':sal', $sal);
            // Ejecutar la sentencia SQL con los valores correspondientes
            $stmt->execute();


            $returnFields["status"] = 200;
            $returnFields["message"] = "Creado exitosamente";

            $returnUsuario = json_encode($returnFields);
            return $returnUsuario;
        } catch (\Throwable $e) {

            $returnFields["status"] = 500;
            $returnFields["message"] = $e->getMessage();

            $returnUsuario = json_encode($returnFields);
            return $returnUsuario;
        }
    }

    private function convert_encoding_recursive($input)
    {
        if (is_array($input)) {
            // Aplicar la función recursivamente a cada elemento del array
            return array_map(array($this, 'convert_encoding_recursive'), $input);
        } elseif (is_string($input)) {
            // Convertir la cadena a UTF-8
            return mb_convert_encoding($input, 'UTF-8', 'auto');
        }
        return $input;
    }

    public function getUsers(): string
    {
        $returnFields = array();
        try {
            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();

            $statement = $pdo->prepare("SELECT id,adminUser,mail,name,user FROM users ");
            $statement->execute();

            $resultado = $statement->fetchAll(PDO::FETCH_ASSOC);



            $returnFields["data"] = $resultado;
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

    public function editUser(): string
    {
        $returnFields = array();
        try {


            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();


            if ($_POST["name"] === null) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "Nombre de usuario requerido";
                $return = json_encode($returnFields);
                return $return;
            }


            $id = $_POST["id"];
            $mail = $_POST["mail"] === null ? "" : $_POST["mail"];
            $user = $_POST["user"] === null ? "" : $_POST["user"];
            $name = $_POST["name"] === null ? "" : $_POST["name"];
            $password = $_POST["password"] === null ? "" : $_POST["password"];
            $comfirm = $_POST["comfirm"] === null ? "" : $_POST["comfirm"];
            $adminUser = !isset($_POST["adminUser"]) ? 0 : 1;

            if ($password != $comfirm) {
                $returnFields["status"] = 406;
                $returnFields["message"] = "Contraseñas no coinciden";

                $returnNew = json_encode($returnFields);


                return json_encode($returnNew);
            }

            $consulta = "SELECT * FROM users WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los parámetros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
            $sal = "";
            $passwordEncrypt ="";

            if ($password != "") {
                $sal = bin2hex(random_bytes(16));
                $passwordEncrypt = hash('sha256', $sal . $password);
            }else{
                $sal = $resultado["key"];
                $passwordEncrypt =  $resultado["password"];
            }


            $stmt = $pdo->prepare("update users set `mail` = :mail,`user` =:user,`name` =:name,`password` =:password , `key` = :key ,`adminUser` = :adminUser where id =:id");


            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':user', $user);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':password', $passwordEncrypt);
            $stmt->bindParam(':key', $sal);
            $stmt->bindParam(':adminUser', $adminUser);
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

    public function deleteUser(): string
    {
        $returnFields = array();
        try {



            $conexion = new Conexion();
            $pdo = $conexion->obtenerConexion();



            $id = $_POST["id"];




            $consulta = "SELECT * FROM users WHERE id = :id ";

            // Preparar la consulta
            $stmt = $pdo->prepare($consulta);

            // Asignar valores a los parámetros (en este caso, solo uno)

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la consulta
            $stmt->execute();
            // Obtener los resultados
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];



            $stmt = $pdo->prepare("delete from users where id = :id");



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




}
