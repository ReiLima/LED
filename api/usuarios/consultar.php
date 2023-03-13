<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objetos/usuario.php';

$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);
  
$stmt = $usuario->consultar();
$num = $stmt->rowCount();
  
if($num>0){
  
    $usuarios_arr=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
  
        $usuario_item=array(
            "id" => $id,
            "nome" => $nome,
            "login" => $login,
            "senha" => $senha
        );
  
        array_push($usuarios_arr, $usuario_item);
    }
  
    http_response_code(200);
  
    echo json_encode($usuarios_arr);
}else{
  
    http_response_code(404);
  
    echo json_encode(
        array("mensagem" => "Nenhum usuário encontrado.")
    );
}