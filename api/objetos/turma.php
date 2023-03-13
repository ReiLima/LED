<?php
class Turma{
  
    private $con;
    private $tabela = "turmas";
  
    public $id;
    public $nome;
    public $foto;
    public $tamanho;
  
    public function __construct($db){
        $this->con = $db;
    }

    function consultar(){
    
        $query = "SELECT t.id, t.nome, t.foto, t.tamanho
                  FROM " . $this->tabela . " t
                  ORDER BY t.id ASC";
    
        $stmt = $this->con->prepare($query);
    
        $stmt->execute();
    
        return $stmt;
    }

    function consultarPorId(){
    
        $query = "SELECT t.id, t.nome, t.foto, t.tamanho
                  FROM " . $this->tabela . " t
                  WHERE id = ?
                  ORDER BY t.id ASC";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->id);
    
        $stmt->execute();
    
        return $stmt;
    }

    function criar(){
    
        $query = "INSERT INTO " . $this->tabela . "
                  (id, nome, foto, tamanho)
                  VALUES (?,?,?,?)";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->id);
        $stmt->bindParam(2, $this->nome);
        $stmt->bindParam(3, $this->foto);
        $stmt->bindParam(4, $this->tamanho);
    
        $stmt->execute();
    
        return $stmt;
    }

}
?>