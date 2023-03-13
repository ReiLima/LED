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
    !empty($dados['nome']) &&
    !empty($dados['login']) &&
    !empty($dados['senha'])
){
  
    $usuario->nome = $dados['nome'];
    $usuario->login = $dados['login'];
    $usuario->senha = md5($dados['senha']);
  
    if($usuario->criar()){
  
        http_response_code(201);
  
        echo json_encode(array("mensagem" => "Usuário cadastrado com sucesso."));
    }
  
    else{
  
        http_response_code(503);
  
        echo json_encode(array("mensagem" => "Falha ao cadastrar o usuário."));
    }
}
  
else{
  
    http_response_code(400);
  
    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );
    
}
?>