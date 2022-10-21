const sidebar = document.getElementById('sidebar');
const closeopen = document.getElementById('closeopen');

closeopen.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

var user = getUser();
console.log('User ', user.nome)
var val = document.getElementById('username')
console.log(val)
val.innerText = user.nome
