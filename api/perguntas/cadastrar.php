<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  

include_once '../config/database.php';
include_once '../objetos/turma.php';
include_once '../objetos/pergunta.php';
  
$database = new Database();
$db = $database->getConnection();
  
$turma = new Turma($db);
$pergunta = new Pergunta($db);

$dados = json_decode(file_get_contents("php://input"), true);
  
if(
    !empty($dados['turma']) &&
    !empty($dados['descricao']) &&
    !empty($dados['opcaoA']) &&
    !empty($dados['opcaoB']) &&
    !empty($dados['opcaoC']) &&
    !empty($dados['opcaoD']) &&
    !empty($dados['opcaoCorreta']) 
){
  
    $turma->id = $dados['turma'];
    $stmt = $turma->consultarPorId();
    $num = $stmt->rowCount();
  
    if($num > 0){

        $pergunta->turma = $turma->id;
        $pergunta->descricao = $dados['descricao'];
        $pergunta->opcaoA = $dados['opcaoA'];
        $pergunta->opcaoB = $dados['opcaoB'];
        $pergunta->opcaoC = $dados['opcaoC'];
        $pergunta->opcaoD = $dados['opcaoD'];
        $pergunta->opcaoCorreta = $dados['opcaoCorreta'];

        if($tema->criar()){
            http_response_code(201);
  
            echo json_encode(array("mensagem" => "Pergunta cadastrada na turma com sucesso."));
        }

        else{
  
            http_response_code(503);
      
            echo json_encode(array("mensagem" => "Falha ao cadastrar a pergunta na turma."));
        }
  
        
    }
  
    else{
  
        http_response_code(503);
  
        echo json_encode(array("mensagem" => "Falha ao localizar a turma."));
    }
}
  
else{
  
    http_response_code(400);
  
    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );
    
}
?>