<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objetos/turma.php';

$database = new Database();
$db = $database->getConnection();

$dados = json_decode(file_get_contents('php://input'), true);

$turma = new Turma($db);

if(
    !empty($dados['id'])
){
    $turma->id = $dados['id'];
}else{
    http_response_code(400);

    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );

    die();
}
  
$stmt = $turma->consultarPorId();
$num = $stmt->rowCount();
  
if($num>0){
  
    $turma_item=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
  
        $turma_item=array(
            "id" => $id,
            "nome" => $nome,
            "foto" => $foto,
            "tamanho" => $tamanho
        );
  
    }
  
    http_response_code(200);
  
    echo json_encode($turma_item);
}else{
  
    http_response_code(404);
  
    echo json_encode(
        array("mensagem" => "Nenhuma turma encontrada para o id informado.")
    );
}

?>