<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objetos/pergunta.php';

$database = new Database();
$db = $database->getConnection();

$dados = json_decode(file_get_contents('php://input'), true);

$pergunta = new Pergunta($db);

if(
    !empty($dados['turma'])
){
    $pergunta->turma = $dados['turma'];
}else{
    http_response_code(400);

    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );

    die();
}
  
$stmt = $pergunta->consultarPorTurma();
$num = $stmt->rowCount();
  
if($num>0){

    $perguntas_arr=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
  
        $pergunta_item=array(
            "turma" => $turma,
            "descricao" => $descricao,
            "opcaoA" => $opcaoA,
            "opcaoB" => $opcaoB,
            "opcaoC" => $opcaoC,
            "opcaoD" => $opcaoD,
            "opcaoCorreta" => $opcaoCorreta,
        );
    
        array_push($perguntas_arr, $pergunta_item);

    }
  
    http_response_code(200);
  
    echo json_encode($perguntas_arr);
}else{
  
    http_response_code(404);
  
    echo json_encode(
        array("mensagem" => "Nenhuma pergunta encontrada.")
    );
}

?>