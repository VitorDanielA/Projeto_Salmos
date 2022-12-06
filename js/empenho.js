var selectedId
var empenhoList = []
var empenho = {}

atualizarTabela()

function atualizarTabela(){
    get('empenho').then(data=>{
    console.log('Data ', data)
    this.empenhoList = data
    this.tableCreate(this.empenhoList)
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
    
            var colNota = document.createElement("td")
            colNota.appendChild(document.createTextNode(element.nota))
            row.appendChild(colNota)
                    
            var colValidade = document.createElement("td")
            colValidade.appendChild(document.createTextNode(element.validade))
            row.appendChild(colValidade)
            
            var colValor = document.createElement("td")
            colValor.appendChild(document.createTextNode(element.valor))
            row.appendChild(colValor)
            
            var colItens = document.createElement("td")
            colItens.appendChild(document.createTextNode(element.itens))
            row.appendChild(colItens)
            
            
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
            
    
            tableBody.appendChild(row)
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

function closePopup(){
    popup.classList.remove("open_popup");
    
}

function openEditPopup(id){
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let emp = this.empenhoList.find(empenho=>{
        return empenho.id === id
    })

    console.log('Empenho achado ', emp)
    
    document.getElementById('notaEmpenhoEditar').value = emp.nota
    document.getElementById('validadeEmpenhoEditar').value = emp.validade
    document.getElementById('valorEmpenhoEditar').value = emp.valor
    document.getElementById('itensEmpenhoEditar').value = emp.itens
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.empenho.nota = document.getElementById('notaEmpenhoAdd').value;
    this.empenho.validade = document.getElementById('validadeEmpenhoAdd').value;
    this.empenho.valor = parseFloat(document.getElementById('valorEmpenhoAdd').value);
    // this.empenho.itens = document.getElementById('itensEmpenhoAdd').value;
    
    post('salvarEmpenho', this.empenho).then(result=>{
        console.log('result', result)
        atualizarTabela()   
    }).catch(error=>{
        console.log('error', error)
    })
    
    this.empenho = {}

    document.getElementById('notaEmpenhoAdd').value = '';
    document.getElementById('validadeEmpenhoAdd').value = '';
    document.getElementById('valorEmpenhoAdd').value = '';
    document.getElementById('itensEmpenhoAdd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarEmpenho', {id:this.selectedId}).then(result=>{
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
    let newNota = document.getElementById('notaEmpenhoEditar').value
    let newValidade = document.getElementById('validadeEmpenhoEditar').value
    let newValor = document.getElementById('valorEmpenhoEditar').value
    let newItens = document.getElementById('itensEmpenhoEditar').value

    this.empenho = this.empenhoList.find(emp=>{
        return emp.id === this.selectedId
    })
    
    this.empenho.nota = newNota
    this.empenho.validade = newValidade
    this.empenho.valor = newValor
    this.empenho.itens = newItens

    console.log('Novo empenho ', this.empenho)
    post('salvarEmpenho', this.empenho).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.empenho = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
