<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objetos/projeto.php';

$database = new Database();
$db = $database->getConnection();

$dados = json_decode(file_get_contents('php://input'), true);

$projeto = new Projeto($db);

if(
    !empty($dados['turma'])
){
    $projeto->turma = $dados['turma'];
}else{
    http_response_code(400);

    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );

    die();
}
  
$stmt = $projeto->consultarPorTurma();
$num = $stmt->rowCount();
  
if($num>0){

    $projetos_arr=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
  
        $projeto_item=array(
            "turma" => $turma,
            "nome" => $nome,
            "foto" => $foto
        );
    
        array_push($projetos_arr, $projeto_item);

    }
  
    http_response_code(200);
  
    echo json_encode($projetos_arr);
}else{
  
    http_response_code(404);
  
    echo json_encode(
        array("mensagem" => "Nenhum projeto encontrado.")
    );
}

?>