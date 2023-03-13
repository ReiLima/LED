<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objetos/membro.php';

$database = new Database();
$db = $database->getConnection();

$dados = json_decode(file_get_contents('php://input'), true);

$membro = new Membro($db);

if(
    !empty($dados['id'])
){
    $membro->membro = $dados['id'];
}else{
    http_response_code(400);

    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );

    die();
}
  
$stmt = $membro->consultarPorMembro();
$num = $stmt->rowCount();
  
if($num>0){
  
    $turmas_arr=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
  
        $turma_item=array(
            "id" => $id,
            "nome" => $nome,
            "foto" => $foto,
            "tamanho" => $tamanho
        );

        array_push($turmas_arr, $turma_item);
  
    }
  
    http_response_code(200);
  
    echo json_encode($turmas_arr);
}else{
  
    http_response_code(404);
  
    echo json_encode(
        array("id" => 0, "mensagem" => "Nenhuma turma encontrada para o membro informado.")
    );
}