<?php
  $inicio  = $_GET['inicio'];
  $final = $_GET['final'];
  $favorecido = $_GET['favorecido'];
  //Filtar por nome e local
    $sql = "SELECT DISTINCT favorecido, EXTRACT( MONTH FROM pdata) as pdata, SUM(valor) as val FROM pagamentos WHERE favorecido = '$favorecido' AND  pdata BETWEEN '$inicio' AND '$final' GROUP BY EXTRACT( MONTH FROM pdata)";
    //echo $sql;
  $dbh = new PDO('mysql:host=localhost;port=3306;dbname=despesas_diarias;charset=utf8', 'root', 'senha');
  //$dbh = new PDO('pgsql:host=localhost;port=5432;dbname=ifsp', 'postgres', 'postgres');
  
?>
<!DOCTYPE html>
<html>
  <head>
    <title>TESTE</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>
  <?php
      // foreach($dbh->query($sql) as $linha){
        // echo $linha['favorecido'];
      $linha = mysql_query($sql);
      echo "$linha";
      $response = new stdClass();
      $response->label = [{$linha['favorecido']}];    
        $obj         = new stdClass();
        $obj->label  = {$linha['pdata']};
        $obj->values = [{$linha['SUM(valor)']}];
      $response->values[] = $obj;
 
      $json = json_encode($response);
      
      echo $json; 
      // }
 
      // foreach($dbh->query($sql) as $linha){
      //   $result[] = $linha['favorecido'];
      // }  
    

    ?> 
  </body>
</html>