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
    !empty($dados['turma'])
){
    $membro->turma = $dados['turma'];
}else{
    http_response_code(400);

    echo json_encode(
        array("mensagem" => "Requisição Inválida. Dados Incompletos.")
    );

    die();
}
  
$stmt = $membro->consultarPorTurma();
$num = $stmt->rowCount();
  
if($num>0){

    $posicao = 1;
  
    $membros_arr=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);

        if($funcao != "Professor"){
  
            $membro_item=array(
                "turma" => $turma,
                "membro" => $nome,
                "funcao" => $funcao,
                "pontuacao" => $pontuacao,
                "posicao" => $posicao
            );
    
            array_push($membros_arr, $membro_item);

            $posicao = $posicao+1;
        }
    }
  
    http_response_code(200);
  
    echo json_encode($membros_arr);
}else{
  
    http_response_code(404);
  
    echo json_encode(
        array("mensagem" => "Nenhum membro encontrado.")
    );
}

?>