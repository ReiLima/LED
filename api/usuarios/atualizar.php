<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  

include_once '../config/database.php';
include_once '../objetos/usuario.php';
  
$database = new Database();
$db = $database->getConnection();
  
$usuario = new Usuario($db);

$dados = json_decode(file_get_contents("php://input"), true);
  
if(
    !empty($dados['id']) &&
    !empty($dados['nome']) &&
    !empty($dados['login']) &&
    !empty($dados['senha'])
){
  
    $usuario->id = $dados['id'];
    $usuario->nome = $dados['nome'];
    $usuario->login = $dados['login'];
    $usuario->senha = md5($dados['senha']);
  
    if($usuario->atualizar()){
  
        http_response_code(200);
  
        echo json_encode(array("mensagem" => "Usuário atualizado com sucesso."));
    }
  
    else{
  
        http_response_code(503);
  
        echo json_encode(array("mensagem" => "Falha ao atualizar o usuário."));
    }
}
  
else{
  
    http_response_code(400);
  
    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );
    
}
?>