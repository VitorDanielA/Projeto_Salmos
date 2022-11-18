var selectedId
var selectedIdEdit
var requisicaoList = [] 
var requisicao = {}
var itensList = [] 
var itens = {}
var item = {}

function requisicaoQtdAddChange(){
    requisicao.quantidadeItensReq = document.getElementById('qtdReq').value;
    console.log(requisicao);
}

function requisicaoUsuAddChange(){
    requisicao.usuarioRequisitante = document.getElementById('usuReq').value;
    console.log(requisicao);
}

setItens()
setItensEdit()
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
    get('Item').then(data=>{
    console.log('Data', data)
    this.itensList = data
    this.tableCreateItens(this.itensList)
        }).catch(error=>{
        console.log('Error ', error)
    })
}

atualizarTabelaItensEdit()
function atualizarTabelaItensEdit(){
    get('Item').then(data=>{
    console.log('Data', data)
    this.itensList = data
    this.tableCreateEdit(this.itensList)
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
        colDescricao.appendChild(document.createTextNode(element.setor ? element.setor.nome : ''))
        row.appendChild(colDescricao)
        
        tableBody.appendChild(row)

        var colInfo = document.createElement("td")
        colInfo.setAttribute("onclick", "openForm("+element.id+")")
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

    get('Item').then(itens=>{
        console.log('Itens ', itens)

        var multiCombo = document.getElementById('Item')

        itens.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)        
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function setItensEdit() {

    get('Item').then(itens=>{
        console.log('Itens ', itens)

        var multiComboEdit = document.getElementById('EditItem')

        itens.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiComboEdit.appendChild(option)        
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}


function setSetores() {

    get('setor').then(setor=>{
        console.log('Setores ', setor)

        var multiCombo = document.getElementById('Setor')
        var multiComboEdit = document.getElementById('EditSetor')
        setor.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)

            let optionEdit = document.createElement('option')
            optionEdit.value = tipo.id
            optionEdit.innerHTML = tipo.nome

            multiComboEdit.appendChild(optionEdit)
            
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
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

function tableCreateEdit(data){
    var tableBody3 = document.getElementById('table-body3');
    if(tableBody3){
        tableBody3.innerHTML = ''
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
        
        tableBody3.appendChild(row)
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
    this.selectedIdEdit = id
    popup.classList.add("open_popup");
    teladisabled();
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

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function openForm(id) {
    this.selectedId = id
    this.selectedIdEdit = id
    document.getElementById("myForm").style.display = "block";
    console.log('Id ',id)
    let usr = this.requisicaoList.find(requisicao=>{
        return requisicao.id === id
    })

    console.log('Requisicao achada ', usr)

    document.getElementById('itemDemonstration').innerHTML = usr.itemRequisitado.nome
    document.getElementById('itemQuantia').innerHTML = usr.quantidadeItensReq
    document.getElementById('itemCodSaida').innerHTML = usr.codSaida
    teladisabled();
}
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

var quantidadeItens

function openEditPopup(id){
    atualizarTabelaItensEdit()
    this.selectedId = id
    this.selectedIdEdit = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let usr = this.requisicaoList.find(requisicao=>{
        return requisicao.id === id
    })

    quantidadeItens = usr.quantidadeItensReq
    console.log('Requisicao achada ', usr)
    
    document.getElementById('EditqtdReq').value = usr.quantidadeItensReq
    document.getElementById('EditusuReq').value = usr.usuarioRequisitante
    if(usr.setor){
        document.getElementById('EditSetor').value = usr.setor.id
    }
    if(usr.itemRequisitado){
       document.getElementById('EditItem').value = usr.itemRequisitado.id
    }
    teladisabled();
}

function editar(){

    let newRequisitante = document.getElementById('EditusuReq').value;
    let newSetor = document.getElementById('EditSetor').value
    let newItemRequisitado = document.getElementById('EditItem').value

    this.requisicao = this.requisicaoList.find(req=>{
        return req.id === this.selectedIdEdit
    })

    let newQuantidadeItensReq = document.getElementById('EditqtdReq').value;

    this.requisicao.quantidadeItensReq = newQuantidadeItensReq
    this.requisicao.usuarioRequisitante = newRequisitante
    this.requisicao.setor = {id:newSetor}
    this.requisicao.itemRequisitado = {id:newItemRequisitado}
    
    get('Item').then(itens=>{
        console.log('Itens ', itens)
        var found = itens.find(element => element.id == document.getElementById('EditItem').value)
        console.log(found)
        let usr = this.requisicaoList.find(requisicao=>{
            return requisicao.id === this.selectedId
        })
        console.log(requisicaoList)
        this.item.id = found.id 
        this.item.nome = found.nome
        this.item.quantidade = found.quantidade + Number(quantidadeItens) - Number(document.getElementById('EditqtdReq').value)
        this.item.descricao = found.descricao
        this.item.fornecedor = found.fornecedor

        post('atualizarItem', this.item).then(result=>{
            console.log('Result ', result)
            atualizarTabelaItens()
        }).catch(error=>{
            console.log('Error ', error)
        })

    }).catch(error=>{
        console.log('Error ', error)
    })

    console.log('Nova Requisição ', this.requisicao)
    post('salvarRequisicoes', this.requisicao).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.requisicao = {}
}

var codSaida;

function adicionar(){

    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ0123456789!@#$&*"

    const gerarCodigoSaida = () =>{
        let novoCodigo = ""

        for(let i = 0; i < 6; i++){
            let charactersAleatorios = Math.floor(Math.random() * characters.length)
            novoCodigo += characters[charactersAleatorios]
        }
        codSaida = novoCodigo
        console.log(codSaida)
    }

    gerarCodigoSaida()

    get('Item').then(itens=>{
        console.log('Itens ', itens)
        var found = itens.find(element => element.id == document.getElementById('Item').value)
        console.log(found)
        this.item.id = found.id
        this.item.nome = found.nome
        this.item.quantidade = found.quantidade - document.getElementById('qtdReq').value;
        this.item.descricao = found.descricao
        this.item.fornecedor = found.fornecedor

        post('atualizarItem', this.item).then(result=>{
            console.log('Result ', result)
            atualizarTabelaItens()
        }).catch(error=>{
            console.log('Error ', error)
        })

    }).catch(error=>{
        console.log('Error ', error)
    })

    this.requisicao.quantidadeItensReq = document.getElementById('qtdReq').value;
    this.requisicao.usuarioRequisitante = document.getElementById('usuReq').value;
    this.requisicao.setor = {id:document.getElementById('Setor').value};
    this.requisicao.itemRequisitado = {id:document.getElementById('Item').value};
    this.requisicao.nome = "Req";
    this.requisicao.codSaida = codSaida;

    post('salvarRequisicoes', this.requisicao).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })
    
    this.requisicao = {}
}

function remover(){

    get('requisicao').then(req=>{
        console.log('Find requisicao ', req)
        const found = req.find(element => element.id == this.selectedId)
        console.log(found)
        var returnValueQtd = found.quantidadeItensReq
        var returnValueId = found.itemRequisitado.id

        get('Item').then(itens=>{
            console.log('Itens ', itens)
            const foundItens = itens.find(element => element.id == returnValueId)
            console.log(foundItens)
            this.item.id = foundItens.id
            this.item.nome = foundItens.nome
            this.item.quantidade = foundItens.quantidade + returnValueQtd
            this.item.descricao = foundItens.descricao
            this.item.fornecedor = foundItens.fornecedor
    
            post('atualizarItem', this.item).then(result=>{
                console.log('Result ', result)
                atualizarTabelaItens()
            }).catch(error=>{
                console.log('Error ', error)
            })
    
        }).catch(error=>{
            console.log('Error ', error)
        })
        
    }).catch(error=>{
        console.log('Error ', error)
    })

    console.log('Deletar ' + this.selectedId)

    get_params('deletarRequisicoes', {id:this.selectedId}).then(result=>{
        atualizarTabela()
    }).catch(error=>{
    })
}

function buscar(){

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("loupe");
    filter = input.value.toUpperCase();
    table = document.getElementById("itens-table");
    tr = table.getElementsByTagName("tr");

            for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }
    }
}


let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
