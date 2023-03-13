<?php
class Usuario{
  
    private $con;
    private $tabela = "usuarios";
  
    public $id;
    public $nome;
    public $login;
    public $senha;
  
    public function __construct($db){
        $this->con = $db;
    }

    function consultar(){
    
        $query = "SELECT u.id, u.nome, u.login, u.senha 
                  FROM " . $this->tabela . " u
                  ORDER BY u.id ASC";
    
        $stmt = $this->con->prepare($query);
    
        $stmt->execute();
    
        return $stmt;
    }

    function consultarPorId(){
    
        $query = "SELECT u.id, u.nome, u.login, u.senha
                  FROM " . $this->tabela . " u
                  WHERE id = ? 
                  ORDER BY u.id ASC";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->id);
    
        $stmt->execute();
    
        return $stmt;
    }

    function validar(){
    
        $query = "SELECT u.id, u.nome, u.login, u.senha 
                  FROM " . $this->tabela . " u
                  WHERE login = ? AND senha = ? 
                  ORDER BY u.id ASC";
    
        $stmt = $this->con->prepare($query);

        $this->senha = md5($this->senha);

        $stmt->bindParam(1, $this->login);
        $stmt->bindParam(2, $this->senha);
    
        $stmt->execute();
    
        return $stmt;
    }

    function atualizar(){
    
        $query = "UPDATE " . $this->tabela . "
                  SET nome = ?, login = ?, senha = ?
                  WHERE id='".$this->id."'";
    
        $stmt = $this->con->prepare($query);

        $this->senha = md5($this->senha);

        $stmt->bindParam(1, $this->nome);
        $stmt->bindParam(2, $this->login);
        $stmt->bindParam(3, $this->senha);
    
        $stmt->execute();
    
        return $stmt;
    }

    function remover(){
    
        $query = "DELETE FROM " . $this->tabela . "
                  WHERE id = ?";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->id);
    
        $stmt->execute();
    
        return $stmt;
    }

    function criar(){
    
        $query = "INSERT INTO " . $this->tabela . "
                  (id, nome, login, senha)
                  VALUES (?,?,?,?)";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->id);
        $stmt->bindParam(2, $this->nome);
        $stmt->bindParam(3, $this->login);
        $stmt->bindParam(4, $this->senha);
    
        $stmt->execute();
    
        return $stmt;
    }
}
?>