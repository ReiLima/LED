<?php
class Tema{
  
    private $con;
    private $tabela = "temas";
  
    public $id;
    public $nome;
    public $descricao;
    public $turma;
    public $foto;
  
    public function __construct($db){
        $this->con = $db;
    }

    function consultar(){
    
        $query = "SELECT t.id, t.nome, t.descricao, t.turma, t.foto
                  FROM " . $this->tabela . " t";
    
        $stmt = $this->con->prepare($query);
    
        $stmt->execute();
    
        return $stmt;
    }

    function consultarPorTurma(){
    
        $query = "SELECT t.id, t.nome, t.descricao, t.turma, t.foto
                  FROM " . $this->tabela . " t
                  WHERE turma = ? OR turma = '0'";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->turma);
    
        $stmt->execute();
    
        return $stmt;
    }

    function criar(){
    
        $query = "INSERT INTO " . $this->tabela . "
                  (nome, descricao, turma)
                  VALUES (?,?,?)";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->nome);
        $stmt->bindParam(2, $this->descricao);
        $stmt->bindParam(3, $this->turma);
    
        $stmt->execute();
    
        return $stmt;
    }

}
?>