
import { getUsuarioLogado } from '../estadoLogin/estadoLogin.js'

document.getElementById("formEmail").addEventListener("submit", verificarEmail);

function verificarEmail(e)
{
e.preventDefault();
var emailD = document.getElementById("email").value;
var msg = document.getElementById("msg");
msg.textContent = "";

const usuarioLogado = getUsuarioLogado();
var v = false;

const emailE = usuarioLogado === emailD ? true : false;

if(!emailE)
{
    msg.textContent = "O e-mail inserido é diferente do e-mail da sua conta. Tente novamente.";
    msg.style.color = "red";
    document.getElementById("email").value = "";
}

else
{
    window.location.href="codigo.html";
}


}