
import { getUsuario } from "../usuario.js";

document.getElementById("formSenha").addEventListener("submit", verificarEmail);


function verificarEmail(e) {
    e.preventDefault();
    var emailD = document.getElementById("email").value;
    var msg = document.getElementById("msg");
    msg.textContent = "";

    const usuarios = getUsuario();
    var v = false;

    const emailE = usuarios.find(u => u.email === emailD);

    if (emailE == null) {
        msg.textContent = "Não foi encontrada uma conta vinculada ao e-mail digitado. Tente novamente.";
        msg.style.color = "red";
        document.getElementById("email").value = "";
        return;
    }

    if(document.getElementById('senha').value.length < 8)
    {
        msg.textContent="A senha deve ter mais de oito caracteres.";
        return;
    }

    if (document.getElementById('senha').value !== document.getElementById('senha2').value) {
        msg.textContent = "As senhas não coincidem. Tente novamente."
        document.getElementById('senha2').value = "";
        return;
    }

     if (document.getElementById('senha').value === document.getElementById('senha2').value) {
        window.location.href = "../login/login.html";
        return;

    }
}