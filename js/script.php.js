<?
  $inicio  = $_GET['inicio'];
  $final = $_GET['final'];
  $favorecido = $_GET['favorecido'];
  // Conexão com o Banco de Dados 
  $dbh = new PDO('mysql:host=localhost;port=3306;dbname=despesas_diarias;charset=utf8', 'root', 'senha'); 
    // Buscar Label;
    $sql = "SELECT DISTINCT favorecido,
                          EXTRACT( MONTH FROM pdata) as pdata,
                          SUM(valor) as val 
          FROM pagamentos 
          WHERE pdata BETWEEN '$inicio' 
            AND '$final'
          GROUP BY EXTRACT( MONTH FROM pdata)";
    
    // $sql = "SELECT DISTINCT favorecido, EXTRACT( MONTH FROM pdata) as pdata FROM pagamentos GROUP BY EXTRACT( MONTH FROM pdata)";
    // echo $sql;
    // Objeto que será convertido num JSON;
    $response = new stdClass();
    // Salvar os Labels;
    foreach ($dbh -> query($sql) as $linha) {
      $response->label[]  = $linha['pdata'];
      $contLabel += 1; 
    }
    //Salvar valores;
      $obj         = new stdClass();
      // Label do valor
      $obj ->label = $linha['favorecido'];
    for ($i = 0; $i <= $contLabel; $i++) {
      $lab = $response->label[$i];
      $sql = "SELECT DISTINCT favorecido,
                          EXTRACT( MONTH FROM pdata) as pdata,
                          SUM(valor) as val 
          FROM pagamentos 
          WHERE favorecido = '$favorecido'
            AND EXTRACT( MONTH FROM pdata) = $lab
          GROUP BY EXTRACT( MONTH FROM pdata)";
      foreach ($dbh -> query($sql) as $linha) {
        // Valores
        $obj ->values[] = $linha['val'];
      }
    }
      $response->values[] = $obj;
    $json = json_encode($response);
    // echo $json;
?>
// Java Script
var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

function init(){
  var json =  <?php echo $json ?>;
  //Dados 'Setados' manualmente
  //   {
  //     'label': ['Janeiro', 'Fevereiro', 'Março'],
  //     'values': [
  //     {
  //       'label': 'TELEFONICA BRASIL',
  //       'values': [368, 628, 131]
  //     }, 
  //     {
  //       'label': 'BANCO DO BRASIL',
  //       'values': [4974, 11726, 15693]
  //     }, 
  //     {
  //       'label': 'CPFL',
  //       'values': [0, 317, 1054]
  //     }
  //    ]       
  // };

    // iniciar BarChart
    var barChart = new $jit.BarChart({
      injectInto: 'infovis',
      animate: true,
      orientation: 'horizontal',
      barsOffset: 20,
      Margin: {
        top:5,
        left: 5,
        right: 5,
        bottom:5
      },
      labelOffset: 5,
      type: useGradients? 'stacked:gradient' : 'stacked',
      showAggregates:true,
      showLabels:true,
      Label: {
        type: labelType, //Native or HTML
        size: 13,
        family: 'Arial',
        color: 'white'
      },
      Tips: {
        enable: true,
        onShow: function(tip, elem) {
          tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
        }
      }
    });

    // //load JSON data.
    // barChart.loadJSON(json);

    var list = $jit.id('id-list'),
        button = $jit.id('filtrar')
    //Atualiza json quando clicar em Filtrar
    $jit.util.addEvent(button, 'click', function() {
      var util = $jit.util;
      barChart.loadJSON(json);
    });
    //Adicionando legendas
    var legend = barChart.getLegend(),
        listItems = [];
    for(var name in legend) {
      listItems.push('<div class=\'query-color\' style=\'background-color:'
          + legend[name] +'\'>&nbsp;</div>' + name);
    }
    list.innerHTML = '<li>' + listItems.join('</li><li>') + '</li>';
}