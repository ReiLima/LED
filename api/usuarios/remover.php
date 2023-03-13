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
  
if(
    !empty($dados['id'])
){
    $usuario->id = $dados['id'];
}else{
    http_response_code(400);

    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );

    die();
}
  
if($usuario->remover()){
  
    http_response_code(200);
  
    echo json_encode(array("mensagem" => "Usuário removido com sucesso."));
}
  
else{
  
    http_response_code(503);
  
    echo json_encode(array("message" => "Falha ao remover o usuário."));
}
?>