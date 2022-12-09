var ItemList = [] 
var item = {}
var arrayItensSelect
var nameItem
var qtdItem
var itemGraf = new Object()

atualizarTabelaItens()
function atualizarTabelaItens(){
    get('Item').then(dataa=>{
        console.log('Data', dataa)

        this.arrayItens = [
            itemGraf.nome = dataa.map(value => value.nome),
            itemGraf.quantidade = dataa.map(value => value.quantidade)
    ];

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: itemGraf.nome,
            datasets: [{
              label: 'Quantidade',
              data: itemGraf.quantidade,
              backgroundColor:[
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 2
            }]
        },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
})}