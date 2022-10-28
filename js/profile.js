
var user = getUser()
setData()

function setData(){
    document.getElementById('nome').value = user.nome
    document.getElementById('email').value = user.email
    document.getElementById('login').value = user.login
    document.getElementById('senha').value = user.senha

    document.getElementById('nome-desc').innerHTML = user.nome
    document.getElementById('email-desc').innerHTML = user.email
    document.getElementById('tipo-desc').innerHTML = user.tipodeusuario.nome
}

function saveUser(){
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let login = document.getElementById('login').value
    let senha = document.getElementById('senha').value

    user.nome = nome
    user.email = email
    user.login = login
    user.senha = senha

    post('salvarUsuario', this.user).then(result=>{
        console.log('result', result)
        setUser(result)
        user = result
        setData()
        disableEdition()
    }).catch(error=>{
        console.log('error', error)
    })

}

function cacelEdition(){
    console.log("Clicou cancelar")
    disableEdition()
}

function enableEdition(){
    var elements = document.getElementsByClassName('input-form')
    for (let el of elements) {
        el.setAttribute('class', 'input-edit input-form')
    }

    document.getElementById('submit-actions').style.visibility = 'visible'

}


function disableEdition(){
    let elements = document.getElementsByClassName('input-form')    
    for (let el of elements) {
        el.setAttribute('class', 'input-show input-form')
    }
    
    document.getElementById('submit-actions').style.visibility = 'hidden'
}
