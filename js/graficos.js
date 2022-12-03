var ItemList = [] 
var item = {}
var arrayItensSelect
var nameItem
var qtdItem

atualizarTabelaItens()
function atualizarTabelaItens(){
    get('Item').then(dataa=>{
        console.log('Data', dataa)

        this.arrayItens = [
            nameItem = dataa.map(value => value.nome),
            qtdItem = dataa.map(value => value.quantidade)
        ];
        
        arrayItensSelect = this.arrayItens
        console.log(this.arrayItens)
        console.log('Nome e quantidade: ', arrayItensSelect)

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var opcoes
   
    for(let i = 0; i < 3; i++){
        
    }


    var data = google.visualization.arrayToDataTable([
        ['Task', 'Tabela de Itens'],
        [`${nameItem[0]}`, qtdItem[0]]
    ]);
    
    var options = {
        // title: 'Itens no Estoque',
        backgroundColor: 'transparent',
        colors: ['#13293D', '#247BA0', '#bac9a9', '#02416d', '#0a5483'],
        chartArea: {'width': '90%', 'height': '90%'},
        is3D: true,
        // titleTextStyle: {
        // color: '#000000', 
        // fontName: 'Trebuchet MS', 
        // fontSize: 24, 
        // bold: false,    
        // italic: false,
        // paddingLeft: 100,  
        // }

    };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
}
    }).catch(error=>{
        console.log('Error ', error)
    })

}
console.log(this.arrayItensSelect)
