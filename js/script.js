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
  //Dados 'Setados' manualmente
  var json = {
      'label': ['Janeiro', 'Fevereiro', 'Março'],
      'values': [
      {
        'label': 'Semana 1',
        'values': [690, 4602, 14999]
      }, 
      {
        'label': 'Semana 2',
        'values': [11065, 5068, 2181]
      }, 
      {
        'label': 'Semana 3',
        'values': [920, 3001, 8086]
      }
     ]
  };
  //Segunda consulta manual
  var json2 = {
      'label': ['Janeiro', 'Fevereiro', 'Março'],
      'values': [
      {
        'label': 'TELEFONICA BRASIL',
        'values': [368, 628, 131]
      }, 
      {
        'label': 'BANCO DO BRASIL',
        'values': [4974, 11726, 15693]
      }, 
      {
        'label': 'CPFL',
        'values': [0, 317, 1054]
      }
     ]       
  };

    //init BarChart
    var barChart = new $jit.BarChart({
      //id of the visualization container
      injectInto: 'infovis',
      //whether to add animations
      animate: true,
      //horizontal or vertical barcharts
      orientation: 'horizontal',
      //bars separation
      barsOffset: 20,
      //visualization offset
      Margin: {
        top:5,
        left: 5,
        right: 5,
        bottom:5
      },
      //labels offset position
      labelOffset: 5,
      //bars style
      type: useGradients? 'stacked:gradient' : 'stacked',
      //whether to show the aggregation of the values
      showAggregates:true,
      //whether to show the labels for the bars
      showLabels:true,
      //labels style
      Label: {
        type: labelType, //Native or HTML
        size: 13,
        family: 'Arial',
        color: 'white'
      },
      //add tooltips
      Tips: {
        enable: true,
        onShow: function(tip, elem) {
          tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
        }
      }
    });
    //load JSON data.
    barChart.loadJSON(json);
    //end
/*
   //init PieChart
    var pieChart = new $jit.PieChart({
      //id of the visualization container
      injectInto: 'infovis',
      //whether to add animations
      animate: true,
      //offsets
      offset: 30,
      sliceOffset: 0,
      labelOffset: 20,
      //slice style
      type: useGradients? 'stacked:gradient' : 'stacked',
      //whether to show the labels for the slices
      showLabels:true,
      //resize labels according to
      //pie slices values set 7px as
      //min label size
      resizeLabels: 7,
      //label styling
      Label: {
        type: labelType, //Native or HTML
        size: 20,
        family: 'Arial',
        color: 'white'
      },
      //enable tips
      Tips: {
        enable: true,
        onShow: function(tip, elem) {
           tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
        }
      }
    });
    //load JSON data.
    pieChart.loadJSON(json);
    //end
*/
    var list = $jit.id('id-list'),
        button = $jit.id('filtrar')
    //Atualiza json quando clicar em Filtrar
    $jit.util.addEvent(button, 'click', function() {
      var util = $jit.util;
      barChart.loadJSON(json2);
      
   //   pieChart.loadJSON(json2);
    });
    //dynamically add legend to list
    var legend = barChart.getLegend(),
        listItems = [];
    for(var name in legend) {
      listItems.push('<div class=\'query-color\' style=\'background-color:'
          + legend[name] +'\'>&nbsp;</div>' + name);
    }
    list.innerHTML = '<li>' + listItems.join('</li><li>') + '</li>';
}


