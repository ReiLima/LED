<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objetos/tema.php';

$database = new Database();
$db = $database->getConnection();

$dados = json_decode(file_get_contents('php://input'), true);

$tema = new Tema($db);

if(
    !empty($dados['turma'])
){
    $tema->turma = $dados['turma'];
}else{
    http_response_code(400);

    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );

    die();
}
  
$stmt = $tema->consultarPorTurma();
$num = $stmt->rowCount();
  
if($num>0){

    $temas_arr=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
  
        $tema_item=array(
            "turma" => $turma,
            "nome" => $nome,
            "descricao" => $descricao
        );
    
        array_push($temas_arr, $tema_item);

    }
  
    http_response_code(200);
  
    echo json_encode($temas_arr);
}else{
  
    http_response_code(404);
  
    echo json_encode(
        array("mensagem" => "Nenhum tema encontrado.")
    );
}

?>