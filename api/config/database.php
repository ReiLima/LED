<?php
class Database{
  
    private $host = "localhost";
    private $db = "api_db";
    private $usuario = "root";
    private $senha = "";
    public $con;
  
    public function getConnection(){
  
        $this->con = null;
  
        try{
            $this->con = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db, $this->usuario, $this->senha);
            $this->con->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Falha ao se conectar no banco de dados. Erro: " . $exception->getMessage();
        }
  
        return $this->con;
    }
}
?>