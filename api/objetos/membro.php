<?php
class Membro{
  
    private $con;
    private $tabela = "membros";
    private $tabela_auxiliar = "turmas";
    private $tabela_auxiliar2 = "usuarios";
  
    public $turma;
    public $membro;
    public $funcao;
    public $pontuacao;
  
    public function __construct($db){
        $this->con = $db;
    }

    function consultar(){
    
        $query = "SELECT m.turma, m.membro, m.funcao, m.pontuacao
                  FROM " . $this->tabela . " m
                  ORDER BY m.pontuacao DESC";
    
        $stmt = $this->con->prepare($query);
    
        $stmt->execute();
    
        return $stmt;
    }

    function consultarPorTurma(){
    
        $query = "SELECT m.turma, m.membro, m.funcao, m.pontuacao,
                  u.id, u.nome
                  FROM " . $this->tabela . " m
                  JOIN " . $this->tabela_auxiliar2 . " u
                  ON m.membro = u.id
                  WHERE turma = ? 
                  ORDER BY m.pontuacao DESC";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->turma);
    
        $stmt->execute();
    
        return $stmt;
    }

    function consultarPorMembro(){
    
        $query = "SELECT m.turma, m.membro, m.funcao, m.pontuacao,
                  t.id, t.nome, t.foto, t.tamanho
                  FROM " . $this->tabela . " m
                  JOIN " . $this->tabela_auxiliar . " t
                  ON m.turma = t.id
                  WHERE membro = ? 
                  ORDER BY m.pontuacao DESC";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->membro);
    
        $stmt->execute();
    
        return $stmt;
    }

    function criar(){
    
        $query = "INSERT INTO " . $this->tabela . "
                  (turma, membro, funcao, pontuacao)
                  VALUES (?,?,?,?)";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $this->turma);
        $stmt->bindParam(2, $this->membro);
        $stmt->bindParam(3, $this->funcao);
        $stmt->bindParam(4, $this->pontuacao);
    
        $stmt->execute();
    
        return $stmt;
    }

    function atualizar(){

        $stmtemp = $this->consultarPorTurma();

        $num = $stmtemp->rowCount();
  
        if($num>0){

            $posicao = 1;
        
            $membros_arr=array();
        
            while ($row = $stmtemp->fetch(PDO::FETCH_ASSOC)){
                
                extract($row);

                if($funcao != "Professor"){
        
                    $membro_item=array(
                        "turma" => $turma,
                        "membro" => $nome,
                        "funcao" => $funcao,
                        "pontuacao" => $pontuacao,
                        "posicao" => $posicao
                    );
            
                    array_push($membros_arr, $membro_item);

                    $posicao = $posicao+1;
                }
            }
        }

        $oldscore = $membros_arr[0]['pontuacao'];

        $score = $oldscore + $this->pontuacao;
    
        $query = "UPDATE " . $this->tabela . "
                  SET pontuacao = ?
                  WHERE membro='".$this->membro."' AND turma='".$this->turma."'";
    
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1, $score);
    
        $stmt->execute();
    
        return $stmt;
    }

}
?>