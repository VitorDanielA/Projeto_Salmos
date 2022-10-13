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

function openEditPopup(){
    popupEdit.classList.add("popupEditOpen");
    document.getElementById("loginUsuario").value = tablee.rows[Index].cells[1].innerHTML;
    document.getElementById("senhaUsuario").value = tablee.rows[Index].cells[2].innerHTML;
    document.getElementById("emailUsuario").value = tablee.rows[Index].cells[3].innerHTML;
    document.getElementById("nomeUsuario").value = tablee.rows[Index].cells[4].innerHTML;
}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    var tablee = document.getElementById("itens-table");

    var row =  tablee.insertRow(1);
    row.onmouseover = () =>{
        getindex(row);
    }
    const itens = document.querySelectorAll('tr');
    console.log(itens);
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    

    var login = document.getElementById("loginUsuarioAdd").value;
    var senha = document.getElementById("senhaUsuarioAdd").value;
    var email = document.getElementById("emailUsuarioAdd").value;
    var nome = document.getElementById("nomeUsuarioAdd").value;
    var tipousuario = document.getElementById("tipoUsuario");
    var valor = tipousuario.options[tipousuario.selectedIndex].value;
    
    cell1.innerHTML = 8;
    cell2.innerHTML = login;
    cell3.innerHTML = senha;
    cell4.innerHTML = email;
    cell5.innerHTML = nome;
    cell6.innerHTML = valor;
    cell7.innerHTML = '<a href="#"><img src="images/excluir2.png" alt="remover"></a>'
    cell7.onclick = () => {
        openPopup();
        teladisabled();
    }
    cell8.innerHTML = '<a href="#"><img src="images/botao-editar2.png" alt="remover"></a>'
    cell8.onclick = () => {
        openEditPopup();
        teladisabled();
    }

    document.getElementById("loginUsuarioAdd").value = "";
    document.getElementById("senhaUsuarioAdd").value = "";
    document.getElementById("emailUsuarioAdd").value = "";
    document.getElementById("nomeUsuarioAdd").value = "";
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
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
