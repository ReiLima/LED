<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  

include_once '../config/database.php';
include_once '../objetos/turma.php';
include_once '../objetos/tema.php';
  
$database = new Database();
$db = $database->getConnection();
  
$turma = new Turma($db);
$tema = new Tema($db);

$dados = json_decode(file_get_contents("php://input"), true);
  
if(
    !empty($dados['turma']) &&
    !empty($dados['nome']) &&
    !empty($dados['descricao']) 
){
  
    $turma->id = $dados['turma'];
    $stmt = $turma->consultarPorId();
    $num = $stmt->rowCount();
  
    if($num > 0){

        $tema->turma = $turma->id;
        $tema->nome = $dados['nome'];
        $tema->descricao = $dados['descricao'];

        if($tema->criar()){
            http_response_code(201);
  
            echo json_encode(array("mensagem" => "Tema cadastrado na turma com sucesso."));
        }

        else{
  
            http_response_code(503);
      
            echo json_encode(array("mensagem" => "Falha ao cadastrar o tema na turma."));
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