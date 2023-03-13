<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objetos/turma.php';

$database = new Database();
$db = $database->getConnection();

$turma = new Turma($db);
  
$stmt = $turma->consultar();
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
        array("mensagem" => "Nenhuma turma encontrada.")
    );
}