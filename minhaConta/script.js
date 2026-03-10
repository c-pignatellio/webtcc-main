const toggleLink1 = document.getElementById('dadosPessoais');
const toggleLink2 = document.getElementById('enderecoPessoal');

toggleLink1.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'dados.html';
});

toggleLink2.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'endereco.html';
    
});

