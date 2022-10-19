

function validateUser(){
    let user = localStorage.getItem('logged_user')
    if(user == null || user == undefined){
        localStorage.setItem("error_message", "Por Favor, faça login para acessar a página")
        window.location.href = "./index.html"
    }
}

function setUser(user){
    localStorage.setItem('logged_user', user)
}

function logOut(){
    localStorage.removeItem('logged_user')
    validateUser()
}