<?php
$usuario = $_GET['usuario'];
$senha = $_GET['senha'];
$data = $_GET['pdata'];
$unidade_gestora  = $_GET['unidade_gestora'];
$favorecido   = $_GET['favorecido'];
$valor   = $_GET['valor'];

  
$dbh = new PDO('mysql:host=localhost;port=3306;dbname=despesas_diarias;charset=utf8', '$usuario', '$senha');
  
$sql = "INSERT INTO pagamentos VALUES ($data, '$unidade_gestora', '$favorecido', '$valor_total')";

$resultado = $dbh->exec($sql);
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Resultado</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <?php
      if($resultado > 0){
        echo '<p>Cadastro feito com sucesso!</p>';
      }else{
        echo '<p>Cadastro não realizado!</p>';
      }
    ?>
  </body>
</html>
	
