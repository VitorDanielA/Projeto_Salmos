

function validateUser(){
    let user = getUser()
    if(user.id == null || user.id == undefined){
        localStorage.setItem("warning_message", "Por Favor, faça login para acessar a página")
        window.location.href = "./index.html"
    }
}

function setUser(user){
    localStorage.setItem('logged_user', JSON.stringify(user))
}

function getUser(){
    return JSON.parse(localStorage.getItem('logged_user'))
}


function logOut(){
    localStorage.removeItem('logged_user')
    window.location.href = "./index.html"
}