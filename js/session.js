

function validateUser(){
    let user = localStorage.getItem('logged_user')
    if(user == null || user == undefined){
        window.location.href = "/";
    }
}

function setUser(user){
    localStorage.setItem('logged_user', user)
}

function logOut(){
    localStorage.setItem('logged_user', undefined)
    validateUser()
}