var selectedId
var requisicaoList = [] 
var requisicao = {}

function requisicaoAddChange(){
    requisicao.nome = document.getElementById('qtdReq').value;
    console.log(requisicao);
}

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