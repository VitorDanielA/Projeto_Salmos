var selectedId
var requisicaoList = [] 
var requisicao = {}
var itensList = [] 
var itens = {}

function requisicaoQtdAddChange(){
    requisicao.quantidadeItensReq = document.getElementById('qtdReq').value;
    console.log(requisicao);
}

function requisicaoUsuAddChange(){
    requisicao.usuarioRequisitante = document.getElementById('usuReq').value;
    console.log(requisicao);
}

// function requisicaoQtdAddChange(){
//     requisicao.nome = document.getElementById('descReq').value;
//     console.log(requisicao);
// }

setItens()
setSetores()
atualizarTabela()
function atualizarTabela(){
    get('requisicao').then(data=>{
    console.log('Data', data)
    this.requisicaoList = data
    this.tableCreate(this.requisicaoList)
        }).catch(error=>{
        console.log('Error ', error)
    })
}

atualizarTabelaItens()
function atualizarTabelaItens(){
    get('item').then(data=>{
    console.log('Data', data)
    this.itensList = data
    this.tableCreateItens(this.itensList)
        }).catch(error=>{
        console.log('Error ', error)
    })
}

function tableCreate(data){
    var tableBody = document.getElementById('table-body');
    if(tableBody){
        tableBody.innerHTML = ''
         data.forEach(element => {
        var row = document.createElement("tr");
        
        var colNumReq = document.createElement("td")
        colNumReq.appendChild(document.createTextNode(element.id))
        row.appendChild(colNumReq)

        var colUsuReq = document.createElement("td")
        colUsuReq.appendChild(document.createTextNode(element.usuarioRequisitante))
        row.appendChild(colUsuReq)

        var colDescricao = document.createElement("td")
        colDescricao.appendChild(document.createTextNode(element.setor))
        row.appendChild(colDescricao)
        
        tableBody.appendChild(row)

        var colInfo = document.createElement("td")
        colInfo.setAttribute("onclick", "openPopup("+element.id+")")
        var infoLink = document.createElement("a")
        var imgInfo = document.createElement("img")
        imgInfo.setAttribute("src", "images/simbolo-de-informacao.png")
        infoLink.appendChild(imgInfo)

        colInfo.appendChild(infoLink)
        row.appendChild(colInfo)

        var colRemover = document.createElement("td")
        colRemover.setAttribute("onclick", "openPopup("+element.id+")")
        var removerLink = document.createElement("a")
        var imgRemove = document.createElement("img")
        imgRemove.setAttribute("src", "images/excluir2.png")
        removerLink.appendChild(imgRemove)
        
        colRemover.appendChild(removerLink)
        row.appendChild(colRemover)
        
        var colEditar = document.createElement("td")
        colEditar.setAttribute("onclick", "openEditPopup("+element.id+")")
        var editarLink = document.createElement("a")
        var imgEditar = document.createElement("img")
        imgEditar.setAttribute("src", "images/botao-editar2.png")
        editarLink.appendChild(imgEditar)
        
        colEditar.appendChild(editarLink)
        row.appendChild(colEditar)

    });
    }
}

function setItens() {

    get('item').then(itens=>{
        console.log('Itens ', itens)

        var multiCombo = document.getElementById('Item')
        // var multiComboEdit = document.getElementById('tipoUsuarioEdit')
        itens.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)

            // let optionEdit = document.createElement('option')
            // optionEdit.value = tipo.id
            // optionEdit.innerHTML = tipo.nome

            // multiComboEdit.appendChild(optionEdit)
            
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function setSetores() {

    get('setor').then(setor=>{
        console.log('Setores ', setor)

        var multiCombo = document.getElementById('Setor')
        // var multiComboEdit = document.getElementById('tipoUsuarioEdit')
        setor.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)

            // let optionEdit = document.createElement('option')
            // optionEdit.value = tipo.id
            // optionEdit.innerHTML = tipo.nome

            // multiComboEdit.appendChild(optionEdit)
            
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function setFornecedor(){

}

function tableCreateItens(data){
    var tableBody2 = document.getElementById('table-body2');
    if(tableBody2){
        tableBody2.innerHTML = ''
        data.forEach(element => {
        var row = document.createElement("tr");
        
        var colNome = document.createElement("td")
        colNome.appendChild(document.createTextNode(element.nome))
        row.appendChild(colNome)

        var colQuantidade = document.createElement("td")
        colQuantidade.appendChild(document.createTextNode(element.quantidade))
        row.appendChild(colQuantidade)

        var colFornecedor = document.createElement("td")
        colFornecedor.appendChild(document.createTextNode(element.fornecedor))
        row.appendChild(colFornecedor)
        
        tableBody2.appendChild(row)
    });
    }
}

function stopPropagation(event){
    event.stopPropagation();
}

function openAddPopup(){
    popupAdd.classList.add("openAddPopup");
}

function closeAddPopup(){
    popupAdd.classList.remove("openAddPopup");
}

function openPopup(id){
    this.selectedId = id
    popup.classList.add("open_popup");
}

function teladisabled(){
    telaDesativada.classList.add("disabled_tela");
    backdrop.classList.add("disabled_tela");
}

function getindex(x){
    globalThis.Index = x.rowIndex;
}

function telaEnabled(){
    telaDesativada.classList.remove("disabled_tela");
    backdrop.classList.remove("disabled_tela");
}

var tablee = document.getElementById("itens-table");

function closePopup(){
    popup.classList.remove("open_popup");
}

function adicionar(){
    this.requisicao.quantidadeItensReq = document.getElementById('qtdReq').value;
    this.requisicao.usuarioRequisitante = document.getElementById('usuReq').value;
    this.requisicao.setor = JSON.stringify({id:document.getElementById('Setor').value});
    this.requisicao.itemRequisitado = JSON.stringify{id:document.getElementById('Item').value};
    this.requisicao.nome = document.getElementById('usuReq').value;

    post('salvarRequisicoes', this.requisicao).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })
    
    this.requisicao = {}
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarRequisicoes', {id:this.selectedId}).then(result=>{
        atualizarTabela()
    }).catch(error=>{
    })
}



let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
