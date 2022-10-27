var selectedId

var tipodeusuario = {}

function tipoDeUsuarioNameAddChange(){
    tipodeusuario.nome = document.getElementById('tipoDeUsuarioNameAdd').value;
    console.log(tipodeusuario);
}

function tipoDeUsuarioDescricaoAddChange(){
    tipodeusuario.descricao = document.getElementById('tipoDeUsuarioDescricaoAdd').value;
    console.log(tipodeusuario);
}

atualizarTabela()

function atualizarTabela(){
    var tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''
    get('tipodeusuario').then(data=>{
    console.log('Data ', data)

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

            function openPopup(){
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

            function openEditPopup(){
                popupEdit.classList.add("popupEditOpen");
                document.getElementById("tipoDeUsuarioName").value = tablee.rows[Index].cells[1].innerHTML;
                document.getElementById("tipoDeUsuarioDescricao").value = tablee.rows[Index].cells[2].innerHTML;
            }

            function closeEditPopup(){
                popupEdit.classList.remove("popupEditOpen");
            }

            function adicionar(){
                post('salvarTipoDeUsuario', tipodeusuario ).then(result=>{
                    console.log('result', result)
                    atualizarTabela()
                }).catch(error=>{
                    console.log('error', error)
                })
            }
            
            
            function remover(){
                console.log(Index);
                if(Index > -1){
                    document.getElementById("itens-table").deleteRow(Index);
                }
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

                var nome = document.getElementById("tipoDeUsuarioName").value;
                var quantidade = document.getElementById("tipoDeUsuarioDescricao").value;
                
                table.rows[Index].cells[1].innerHTML = nome;
                table.rows[Index].cells[2].innerHTML = quantidade;
            }
        
        let popup = document.getElementById("popupRemove");
        let telaDesativada = document.getElementById("tela");
        let backdrop = document.getElementById("backdrop");
        let popupEdit = document.getElementById("popupEdit");
        let popupAdd = document.getElementById("popupAdd");
        var tableInteract = document.getElementById("itens-table");
