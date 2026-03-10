import { ClienteService } from "../estadoLogin/clienteService.js";
import { setLoggedIn, logout } from "../estadoLogin/estadoLogin.js";

document.getElementById("excluir").addEventListener('click', excluir);
document.getElementById("mudarSenha").addEventListener('click', mudarSenha);


async function excluir() {
  Swal.fire({
    title: "Está ação irá excluir sua conta permanentemente. Confirma a exclusão?",
    showDenyButton: true,
    confirmButtonText: "Excluir",
    denyButtonText: `Não excluir`,
    customClass: {
      popup: 'my-swal-popup',
      title: 'my-swal-title',
      content: 'my-swal-content',
      confirmButton: 'my-swal-confirm-button',
      denyButton: 'my-swal-deny-button',
    }
  }).then((result) => {


    if (result.isConfirmed) {
      apagarCliente();
      Swal.fire("Conta excluída!", "", "success").then(() => {
        window.location.href = '../index/index.html';
        logout();
      });


    } else if (result.isDenied) {
      Swal.fire("Operação cancelada", "", "info");
    }
  });


}

function mudarSenha() {
  window.location.href = "../mudarASenha/mudarSenha.html";
}

async function apagarCliente() {
  const usuarioLogado = sessionStorage.getItem("usuarioLogado");
  try {
    const uu = await ClienteService.buscarPorEmail(usuarioLogado);
    console.log(uu);
    console.log(uu.CODIGO);
    try {
      const r = await ClienteService.removerCliente(uu.CODIGO);
      console.log(r);
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }
  catch (error) {
    console.error("Erro ao buscar cliente para exclusão:", error);
  }

}



