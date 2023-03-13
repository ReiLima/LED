<?php
class Projeto{
  
    private $con;
    private $tabela = "projetos";
  
    public $id;
    public $nome;
    public $turma;
    public $foto;
  
    public function __construct($db){
        $this->con = $db;
    }

    function consultar(){
    
        $query = "SELECT p.id, p.nome, p.turma, p.foto
                  FROM " . $this->tabela . " p";
    
        $stmt = $this->con->prepare($query);
    
        $stmt->execute();
    
        return $stmt;
    }

    function consultarPorTurma(){
    
        $query = "SELECT p.id, p.nome, p.turma, p.foto
                  FROM " . $this->tabela . " p
                  WHERE turma = ? OR turma = '0'";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->turma);
    
        $stmt->execute();
    
        return $stmt;
    }

    function criar(){
    
        $query = "INSERT INTO " . $this->tabela . "
                  (nome, turma, foto)
                  VALUES (?,?,?)";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->nome);
        $stmt->bindParam(2, $this->turma);
        $stmt->bindParam(3, $this->foto);
    
        $stmt->execute();
    
        return $stmt;
    }

}
?>