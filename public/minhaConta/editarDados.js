import { getUsuarioLogado } from "../estadoLogin/estadoLogin.js";

import { ClienteService } from "../estadoLogin/clienteService.js";
import SSAAPassNode from "three/examples/jsm/tsl/display/SSAAPassNode.js";

const nome = document.getElementById('nome');
const email = document.getElementById('email');
const cpf = document.getElementById('cpf');
const celular = document.getElementById('celular');


const usuario = getUsuarioLogado();

async function loadDadosEditar() {
    try {
        const usuarioDados = await ClienteService.buscarPorEmail(usuario);
        //console.log(usuarioDados);
        nome.value = usuarioDados.NOME;
        email.value = usuarioDados.EMAIL;
        cpf.value = usuarioDados.CPF_CNPJ;
        celular.value = usuarioDados.CELULAR;
    }
    catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
    }
}
loadDadosEditar();
document.getElementById('formEdicao').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const usuarioAtualizado = {
        NOME: nome.value,
        EMAIL: email.value,
        CPF_CNPJ: cpf.value,
        CELULAR: celular.value,
        SENHA: "",
        URL_IMAGE: "",
    };

    try {
        const codigo = await pegarCodigo(usuario);
        const response = await ClienteService.atualizarCliente(codigo, usuarioAtualizado);
        
        console.log("Usuário atualizado com sucesso:", response);
        
        const result = await Swal.fire({
            title: "Dados atualizados com sucesso!",
            text: "Suas informações foram atualizadas.",
            icon: "success",
            confirmButtonText: "Ok",
            customClass: {
                popup: 'my-swal-popup',
                title: 'my-swal-title',
                content: 'my-swal-content',
                confirmButton: 'my-swal-confirm-button',
            }
        });

        if (result.isConfirmed) {
            window.location.href = "minhaConta.html";
        }
        
    } catch (error) {
        console.error("Erro:", error);
        
        await Swal.fire({
            title: "Erro!",
            text: error.message || "Erro ao atualizar dados. Tente novamente.",
            icon: "error",
            confirmButtonText: "Entendi",
            customClass: {
                popup: 'my-swal-popup',
                title: 'my-swal-title',
                content: 'my-swal-content',
                confirmButton: 'my-swal-confirm-button',
            }
        });
    }
});
async function pegarCodigo(uLogado) {
    try {
        const usuarioDados = await ClienteService.buscarPorEmail(uLogado);
        const r = usuarioDados.CODIGO;
        return r;

    }
    catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
    }
}

