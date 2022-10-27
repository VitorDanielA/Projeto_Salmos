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
var usuariosList = []
var usuario = {}

    



atualizarTabela()
setTiposDeUsuario()

function atualizarTabela(){
    get('usuarios').then(data=>{
    console.log('Data ', data)
    this.usuariosList = data
    this.tableCreate(this.usuariosList)
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
    
            var colLogin = document.createElement("td")
            colLogin.appendChild(document.createTextNode(element.login))
            row.appendChild(colLogin)
                    
            var colEmail = document.createElement("td")
            colEmail.appendChild(document.createTextNode(element.email))
            row.appendChild(colEmail)
            
            var colNome = document.createElement("td")
            colNome.appendChild(document.createTextNode(element.nome))
            row.appendChild(colNome)
            
            var colTipo = document.createElement("td")
            colTipo.appendChild(document.createTextNode(element.tipodeusuario ? element.tipodeusuario.nome : ''))
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
            var imgEditar = document.createElement("img")
            imgEditar.setAttribute("src", "images/botao-editar2.png")
            editarLink.appendChild(imgEditar)
            
            colEditar.appendChild(editarLink)
            row.appendChild(colEditar)
            
    
            tableBody.appendChild(row)
        });
    }
}
          
function setTiposDeUsuario() {
/* <select name="Tipo de Usuário" id="tipoUsuario" onchange="tipoUsuarioChange()">
            <option value="1">Administrador</option>
            <option value="2">Funcionário</option>
            <option value="3">Estudante</option>
        </select> */

    get('tipodeusuario').then(tiposdeusuarios=>{
        console.log('Tipos de usuario ', tiposdeusuarios)

        var multiCombo = document.getElementById('tipoUsuario')
        var multiComboEdit = document.getElementById('tipoUsuarioEdit')
        tiposdeusuarios.forEach(tipo=>{
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
    let usr = this.usuariosList.find(user=>{
        return user.id === id
    })

    console.log('Usuario achado ', usr)
    
    document.getElementById('loginUsuarioEditar').value = usr.login
    document.getElementById('emailUsuarioEditar').value = usr.email
    document.getElementById('nomeUsuarioEditar').value = usr.nome
    if(usr.tipodeusuario)
        document.getElementById('tipoUsuarioEdit').value = usr.tipodeusuario.id
    

}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.usuario.login = document.getElementById('loginUsuarioAdd').value;
    this.usuario.nome = document.getElementById('nomeUsuarioAdd').value;
    this.usuario.senha = document.getElementById('senhaUsuarioAdd').value;
    this.usuario.email = document.getElementById('emailUsuarioAdd').value;
    this.usuario.tipodeusuario = {id:document.getElementById('tipoUsuario').value};

    post('salvarUsuario', this.usuario).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })
    
    this.usuario = {}
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarUsuario', {id:this.selectedId}).then(result=>{
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
    let newLogin = document.getElementById('loginUsuarioEditar').value
    let newEmail = document.getElementById('emailUsuarioEditar').value
    let newNome = document.getElementById('nomeUsuarioEditar').value
    let newTipoId = document.getElementById('tipoUsuarioEdit').value

    this.usuario = this.usuariosList.find(user=>{
        return user.id === this.selectedId
    })
    
    this.usuario.nome = newNome
    this.usuario.login = newLogin
    this.usuario.email = newEmail
    this.usuario.tipodeusuario = {id:newTipoId}

    console.log('Novo user ', this.usuario)
    post('atualizarUsuario', this.usuario).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.usuario = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
