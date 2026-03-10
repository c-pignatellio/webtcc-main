import { getUsuarioLogado, getLoggedIn } from '../estadoLogin/estadoLogin.js'
import { ClienteService } from '../estadoLogin/clienteService.js';


const email = sessionStorage.getItem("emailTroca");
const codigo = sessionStorage.getItem("codigo");

async function verificarEmail(e) {
    e.preventDefault();
    var emailD = document.getElementById("email").value;
    var msg = document.getElementById("msg");
    //msg.textContent = "";

    const usuarioLogado = getUsuarioLogado();
    var v = false;

    const emailE = email === emailD ? true : false;

    if (!emailE) {
        msg.textContent = "O e-mail inserido é diferente do e-mail da sua conta. Tente novamente.";
        msg.style.color = "red";
        document.getElementById("email").value = "";
        console.log("usuario errado!")
        return;
    }

    if (document.getElementById('senha').value.length < 8) {
        msg.textContent = "A senha deve ter mais de oito caracteres.";
        return;
    }

    if (document.getElementById('senha').value !== document.getElementById('senha2').value) {
        msg.textContent = "As senhas não coincidem. Tente novamente."
        document.getElementById('senha2').value = "";
        return;
    }

    if (document.getElementById('senha').value === document.getElementById('senha2').value) {

        try {
            const r = await ClienteService.redefinirSenha(email, codigo, document.getElementById("senha").value);
            sessionStorage.removeItem("codigo");
            sessionStorage.removeItem("emailTroca");
            Swal.fire({
                icon: 'success',
                title: 'Senha alterada com sucesso!',
                confirmButtonText: "Ok",
                customClass: {
                    popup: 'my-swal-popup',
                    title: 'my-swal-title',
                    content: 'my-swal-content',
                    confirmButton: 'my-swal-confirm-button',
                }
            }
            ).then((result) => {

                if (result.isConfirmed) {
                    if (getLoggedIn()) {
                        window.location.href = "../minhaConta/minhaConta.html";
                    }
                    else window.location.href = "../login/login.html";
                }

            });


        }
        catch (e) {
            console.error(e);
        }

        return;

    }



}

document.getElementById("formSenha").addEventListener("submit", verificarEmail);