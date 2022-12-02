var selectedId
var ItemList = [] 
var item = {}


function itemNameAddChange(){
    item.nome = document.getElementById('itemNameAdd').value;
    console.log(item);
}
function itemQuantidadeAddChange(){
    item.quantidade = document.getElementById('itemQuantidadeAdd').value;
    console.log(item);
}

function itemTypeAddChange(){
    item.tipoItem = {id:document.getElementById('itemType').value};
    console.log(item);
}

function itemFornecedorAddChange(){
    item.fornecedor = {id:document.getElementById('itemFornecedorAdd').value};
    console.log(item);
}
setFornecedor()
setTiposItem()
atualizarTabela()
function atualizarTabela(){
    
    get('Item').then(data=>{
    console.log('Data', data)
    this.ItemList = data
    this.tableCreate(this.ItemList)
    console.log(ItemList)
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

        var colId = document.createElement("td")
        colId.appendChild(document.createTextNode(element.id))
        row.appendChild(colId)

        var colNome = document.createElement("td")
        colNome.appendChild(document.createTextNode(element.descricao))
        row.appendChild(colNome)

        var colQuantidade = document.createElement("td")
        colQuantidade.appendChild(document.createTextNode(element.quantidadeMinima))
        row.appendChild(colQuantidade)

        var colType = document.createElement("td")
        colType.appendChild(document.createTextNode(element.tipoItem ? element.tipoItem.nome : ''))
        row.appendChild(colType)
        
        var colFornecedor = document.createElement("td")
        colFornecedor.appendChild(document.createTextNode(element.fornecedor))
        row.appendChild(colFornecedor)
        tableBody.appendChild(row)

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

function openEditPopup(id){
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let usr = this.ItemList.find(user=>{
        return user.id === id
    })

    console.log('Item achado ', usr)
    
    document.getElementById('itemName').value = usr.nome
    document.getElementById('itemDescricao').value = usr.descricao
    document.getElementById('itemQuantidade').value = usr.quantidade
    document.getElementById('itemQuantidadeMinima').value = usr.quantidadeMinima
    document.getElementById('itemFornecedor').value = usr.fornecedor
    document.getElementById('itemValidade').value = usr.validade
    document.getElementById('itemValor').value = usr.valor
   
    document.getElementById('itemType').value = usr.tipoItem
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.item.name = getElementById("itemNameAdd").value;
    this.item.descricao = getElementById("itemDescicaoAdd").value;
    this.item.quantidade = getElementById("itemQuantidade").value;
    this.item.quantidadeMinima = getElementById("ItemQuantidadeMinima").value;
    this.item.fornecedor = {id:document.getElementById('itemFornecedorAdd').value}
    this.item.data = getElementById('itemValidadeAdd').value;
    this.item.perecivel = getElementById('itemPerecivelAdd').value;
    this.item.valor = getElementById('itemValorAdd').value;
    this.item.tipoItem = {id:document.getElementById('itemType').value}
    this.item.name = 'teste'

    post('salvarItem', item ).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarItem', {id:this.selectedId, p2:'is'}).then(result=>{
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

var table = document.getElementById("itens-table");

function editar(){

    var nome = document.getElementById("itemName").value;
    var tipoItem = document.getElementById("itemType").value;
    var quantidade = document.getElementById("itemQuantidade").value;
    var fornecedor = document.getElementById("itemFornecedor").value;

    this.item = this.ItemList.find(user=>{
        return user.id === this.selectedId
    })

    this.item.nome = nome
    this.item.quantidade = quantidade
    this.item.tipoItem = tipoItem
    this.item.fornecedor = fornecedor

    console.log('Novo Item user ', this.item)
    post('salvarItem', this.item).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.item = {}
}

function setTiposItem(){
    get('tipoDeItem').then(tipoitem=>{
        console.log('Tipos de item ', tipoitem)
        var multiCombo = document.getElementById('itemType')
        var multiComboEdit = document.getElementById('itemTypeEdit')
        tipoitem.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)
            
        })
           
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function setFornecedor(){
    get('fornecedor').then(fornecedores=>{
        console.log('Fornecedores ', fornecedores)
        var multiCombo = document.getElementById('itemFornecedorAdd')
        fornecedores.forEach(forn=>{
            let option = document.createElement('option')
            option.value = forn.id
            option.innerHTML = forn.nome

            multiCombo.appendChild(option)
            
        })
           
    }).catch(error=>{
        console.log('Error ', error)
    })
}

        let popup = document.getElementById("popupRemove");
        let telaDesativada = document.getElementById("tela");
        let backdrop = document.getElementById("backdrop");
        let popupEdit = document.getElementById("popupEdit");
        let popupAdd = document.getElementById("popupAdd");
        var tableInteract = document.getElementById("itens-table");