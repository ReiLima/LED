<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  

include_once '../config/database.php';
include_once '../objetos/turma.php';
include_once '../objetos/membro.php';
  
$database = new Database();
$db = $database->getConnection();
  
$turma = new Turma($db);
$membro = new Membro($db);

$dados = json_decode(file_get_contents("php://input"), true);
  
if(
    !empty($dados['turma']) &&
    !empty($dados['id']) &&
    !empty($dados['pontuacao'])
){
  
    $turma->id = $dados['turma'];
    $stmt = $turma->consultarPorId();
    $num = $stmt->rowCount();
  
    if($num > 0){

        $membro->turma = $turma->id;
        $membro->membro = $dados['id'];
        $membro->funcao = "Aluno";
        $membro->pontuacao = $dados['pontuacao'];

        if($membro->atualizar()){
            http_response_code(201);
  
            echo json_encode(array("mensagem" => "Membro atualizado na turma com sucesso."));
        }

        else{
  
            http_response_code(503);
      
            echo json_encode(array("mensagem" => "Falha ao atualizar o membro da turma."));
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