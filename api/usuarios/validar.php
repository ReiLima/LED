<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objetos/usuario.php';

$database = new Database();
$db = $database->getConnection();

$dados = json_decode(file_get_contents('php://input'), true);

$usuario = new Usuario($db);

if(
    !empty($dados['login']) &&
    !empty($dados['senha'])
){
    $usuario->login = $dados['login'];
    $usuario->senha = $dados['senha'];
}else{
    http_response_code(400);
  
    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );

    die();
}
  
$stmt = $usuario->validar();
$num = $stmt->rowCount();
  
if($num>0){
  
    $usuario_item=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
  
        $usuario_item=array(
            "id" => $id,
            "nome" => $nome,
            "login" => $login,
            "senha" => $senha
        );
  
    }
  
    http_response_code(200);
  
    echo json_encode($usuario_item);
}else{
  
    http_response_code(404);
  
    echo json_encode(
        array("mensagem" => "Usuário ou senha incorretos. Por favor, tente novamente.")
    );
}