const sidebar = document.getElementById('sidebar');
const closeopen = document.getElementById('closeopen');

closeopen.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});