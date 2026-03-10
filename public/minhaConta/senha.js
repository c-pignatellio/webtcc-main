// imagem olhar senha ou nao
const aberto = '../../public/imagens/aberto.png';
const fechado = '../../public/imagens/fechado.png'; //sem visualizar a senha


const botao = document.getElementById("botao");
botao.addEventListener('click', clicar);

var olho = document.getElementById("olho");
olho.src = fechado;
var estado = "fechado";

const texto = document.getElementById("senha")//input que aparece a senha
texto.type = "password";



const botao2 = document.getElementById("botao2");
botao2.addEventListener('click', clicar2);

var olho2 = document.getElementById("olho2");
olho2.src = fechado;
var estado2 = "fechado";

const texto2 = document.getElementById("senha2")//input que aparece a senha
texto2.type = "password";


function clicar2() {

    if (estado2 == "aberto") {
        olho2.src = fechado;
        texto2.type = "password";//mudar o estilo pra nao aparecer a senha
        estado2 = "fechado"
    }

    else if (estado2 == "fechado") {
        olho2.src = aberto;
        texto2.type = "text";//mudar o estilo pra aparecer a senha
        estado2 = "aberto"

    }
}

function clicar() {

    if (estado == "aberto") {
        olho.src = fechado;
        texto.type = "password";//mudar o estilo pra nao aparecer a senha
        estado = "fechado"
    }

    else if (estado == "fechado") {
        olho.src = aberto;
        texto.type = "text";//mudar o estilo pra aparecer a senha
        estado = "aberto"

    }
}






document.getElementById("formSenha").addEventListener("submit", function (event) {
    event.preventDefault();

    const senha1 = document.getElementById("senha").value;
    const senha2 = document.getElementById("senha2").value;
    const senha1Input = document.getElementById("senha");
    const senha2Input = document.getElementById("senha2");
    const alerta = document.getElementById("msg");
    document.getElementById("msg").style.color = "red";

    senha1Input.style.borderColor = "";
    senha2Input.style.borderColor = "";

    if (senha1.length < 8) {
        console.log("A SENHA DEVE TER MAIS DE 5 CARACTERES");
        senha1Input.style.borderColor = "red";
        alerta.textContent = "A senha deve ter mais de 8 caracteres.";
        return;

    }

     if (!senha1.trim() || !senha2.trim()) {

        senha1Input.style.borderColor = "red";
        senha2Input.style.borderColor = "red";
        return;
    }

     if (senha1.trim() !== senha2.trim()) {
        alerta.textContent = "As senhas não coincidem."
        senha1Input.style.borderColor = "red";
        senha2Input.style.borderColor = "red";
        return;
    }



    //window.location.href = "../minhaConta/minhaConta.html";
});

