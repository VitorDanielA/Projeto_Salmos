const sidebar = document.getElementById('sidebar');
const closeopen = document.getElementById('closeopen');

var user = getUser();

var val = document.getElementById('user_name')
val.value = user.nome

closeopen.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});