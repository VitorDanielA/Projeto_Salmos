/* <tr onmouseover="getindex(this)">
                    <td>1</td>
                    <td>Duda</td>
                    <td>1234</td>
                    <td>duda@gmail.com</td>
                    <td>Eduarda</td>
                    <td>1</td>
                    <td class="remove" onclick="openPopup(), teladisabled()"><a href="#"><img src="images/excluir2.png" alt="remover"></a></td>
                    <td class="edit" onclick="openEditPopup(), teladisabled()"><a href="#"><img src="images/botao-editar2.png" alt="remover"></a></td>
                </tr> */

var selectedId

var usuario = {}

function loginUsuarioAddChange(){
    usuario.login = document.getElementById('loginUsuarioAdd').value;
    console.log(usuario)
}

function senhaUsuarioAddChange(){
    usuario.senha = document.getElementById('senhaUsuarioAdd').value;
    console.log(usuario)
}

function emailUsuarioAddChange(){
    usuario.email = document.getElementById('emailUsuarioAdd').value;
    console.log(usuario)
}

function nomeUsuarioAddChange(){
    usuario.nome = document.getElementById('nomeUsuarioAdd').value;
    console.log(usuario)
}

function tipoUsuarioChange(){
    usuario.tipodeusuario = document.getElementById('tipoUsuario').value;
    console.log(usuario)
}

atualizarTabela()

function atualizarTabela(){
    var tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''
    get('usuarios').then(data=>{
    console.log('Data ', data)
    data.forEach(element => {
        var row = document.createElement("tr");

        var colId = document.createElement("td")
        colId.appendChild(document.createTextNode(element.id))
        row.appendChild(colId)

        var colLogin = document.createElement("td")
        colLogin.appendChild(document.createTextNode(element.login))
        row.appendChild(colLogin)
        
        var colLogin = document.createElement("td")
        colLogin.appendChild(document.createTextNode(element.senha))
        row.appendChild(colLogin)
        
        var colEmail = document.createElement("td")
        colEmail.appendChild(document.createTextNode(element.email))
        row.appendChild(colEmail)
        
        var colNome = document.createElement("td")
        colNome.appendChild(document.createTextNode(element.nome))
        row.appendChild(colNome)
        
        var colTipo = document.createElement("td")
        colTipo.appendChild(document.createTextNode(element.tipodeusuario))
        row.appendChild(colTipo)
        
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
        var imgEdit = document.createElement("img")
        imgEdit.setAttribute("src", "images/botao-editar2.png")
        editarLink.appendChild(imgEdit)
        colEditar.appendChild(editarLink)

        row.appendChild(colEditar)
        

        tableBody.appendChild(row)
    });
    }).catch(error=>{
        console.log('Error ', error)
    })
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

var tablee = document.getElementById("itens-table");

function adicionar(){
    post('salvarUsuario', usuario).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarUsuario', {id:this.selectedId, p2:'is'}).then(result=>{
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

    var login = document.getElementById("loginUsuario").value;
    var senha = document.getElementById("senhaUsuario").value;
    var email = document.getElementById("emailUsuario").value;
    var nome = document.getElementById("nomeUsuario").value;
    var tipousuario = document.getElementById("tipoUsuarioEdit");
    var valor = tipousuario.options[tipousuario.selectedIndex].value;

    table.rows[Index].cells[1].innerHTML = login;
    table.rows[Index].cells[2].innerHTML = senha;
    table.rows[Index].cells[3].innerHTML = email;
    table.rows[Index].cells[4].innerHTML = nome;
    table.rows[Index].cells[5].innerHTML = valor;
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
