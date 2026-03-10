import { ClienteService } from "../estadoLogin/clienteService.js";
import { getUsuarioLogado, getLoggedIn } from "../estadoLogin/estadoLogin.js";

async function verificarEmail(e) {
    e.preventDefault();
    var emailD = document.getElementById("email").value;
    var msg = document.getElementById("msg");
    msg.textContent = "";
    msg.style.color = "red";
    console.log("entrou em pedir codigo");

    try {
        const e = await ClienteService.buscarPorEmail(emailD);
        if (!e) {
            msg.textContent = "Este e-mail não está cadastrado!"
            return;
        }
        if (getLoggedIn()) {
            if (emailD !== getUsuarioLogado()) {
                msg.textContent = "Este e-mail não está vinculado à sua conta!"
                return;
            }
        }


        document.querySelectorAll(".loader")[0].style.display = "inherit";
        const r = await ClienteService.solicitarRecuperacaoSenha(emailD);
        Swal.fire({
            icon: 'success',
            title: 'Aguarde!',
            text: r.message,
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
                sessionStorage.setItem("emailTroca", emailD);

                window.location.href = "../../view/mudarASenha/codigo.html";
            }

        });

    }
    catch (error) {
        console.error(error.message);
    }

}
document.getElementById("formEmail")?.addEventListener("submit", verificarEmail);

