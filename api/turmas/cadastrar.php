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

function generateRandomString($length = 10) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
  
if(
    !empty($dados['nome'])
){
  
    $turma->id = '#'.generateRandomString(5);
    $turma->nome = $dados['nome'];
    $turma->foto = null;
    $turma->tamanho = 0;
  
    if($turma->criar()){

        $membro->turma = $turma->id;
        $membro->membro = $dados['id'];
        $membro->funcao = "Professor";
        $membro->pontuacao = 0;

        if($membro->criar()){
            http_response_code(201);
  
            echo json_encode(array("mensagem" => "Turma cadastrada com sucesso."));
        }

        else{
  
            http_response_code(503);
      
            echo json_encode(array("mensagem" => "Falha ao cadastrar a turma."));
        }
  
        
    }
  
    else{
  
        http_response_code(503);
  
        echo json_encode(array("mensagem" => "Falha ao cadastrar a turma."));
    }
}
  
else{
  
    http_response_code(400);
  
    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );
    
}
?>