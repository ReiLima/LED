<?php
class Pergunta{
  
    private $con;
    private $tabela = "perguntas";
  
    public $id;
    public $turma;
    public $descricao;
    public $opcaoA;
    public $opcaoB;
    public $opcaoC;
    public $opcaoD;
    public $opcaoCorreta;
  
    public function __construct($db){
        $this->con = $db;
    }

    function consultar(){
    
        $query = "SELECT p.id, p.turma, p.descricao, p.opcaoA, p.opcaoB, p.opcaoC, p.opcaoD, p.opcaoCorreta
                  FROM " . $this->tabela . " p";
    
        $stmt = $this->con->prepare($query);
    
        $stmt->execute();
    
        return $stmt;
    }

    function consultarPorTurma(){
    
        $query = "SELECT p.id, p.turma, p.descricao, p.opcaoA, p.opcaoB, p.opcaoC, p.opcaoD, p.opcaoCorreta
                  FROM " . $this->tabela . " p
                  WHERE turma = ? OR turma = '0'";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->turma);
    
        $stmt->execute();
    
        return $stmt;
    }

    function criar(){
    
        $query = "INSERT INTO " . $this->tabela . "
                  (turma, descricao, opcaoA, opcaoB, opcaoC, opcaoD, opcaoCorreta)
                  VALUES (?,?,?,?,?,?,?)";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->turma);
        $stmt->bindParam(2, $this->descricao);
        $stmt->bindParam(3, $this->opcaoA);
        $stmt->bindParam(4, $this->opcaoB);
        $stmt->bindParam(5, $this->opcaoC);
        $stmt->bindParam(6, $this->opcaoD);
        $stmt->bindParam(7, $this->opcaoCorreta);
    
        $stmt->execute();
    
        return $stmt;
    }

}
?>