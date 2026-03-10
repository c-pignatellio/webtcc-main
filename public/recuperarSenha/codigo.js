import { ClienteService } from "../estadoLogin/clienteService";

const email = sessionStorage.getItem("emailTroca");
console.log(email);

async function verificarCodigo() {
    const codigo = document.getElementById("campo").value;
    const msg = document.getElementById("msg");
    msg.textContent = "Verificando...";  
    msg.style.color = "rgb(118, 159, 125)";


    try {
        const result = await ClienteService.verificarCodigoRecuperacao(email, codigo);

        if (!result) {
            throw new Error('Resposta vazia do service');
        }

        if (result.success && result.valid) {
            //sessionStorage.removeItem("emailTroca");
            sessionStorage.setItem("codigo", codigo)
            window.location.href = "../../view/mudarASenha/senhaNova.html";
        } else {
            if(result.error)
            {
                msg.innerHTML = result.error + ". " + "<a href='./mudarSenha.html' style='text-decoration: none;color:rgb(118, 159, 125)'>Voltar para pedir código de verificação</a>"
            }
            else{
            msg.innerHTML = "O código inserido está incorreto. Tente novamente.";}
            msg.style.color = "red";
        }
    } catch (e) {
        msg.textContent = "Erro de conexão ou servidor. Tente novamente.";
        msg.style.color = "red";
    }
}

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault(); 
    verificarCodigo();
});