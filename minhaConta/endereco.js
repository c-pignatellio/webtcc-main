import { ClienteService } from '../estadoLogin/clienteService.js';
import { getLoggedIn, getUsuarioLogado } from '../estadoLogin/estadoLogin';
var r = document.getElementById('rua');
var cep = document.getElementById('cep');
var c = document.getElementById('cidade');
var e = document.getElementById('estado');
var n = document.getElementById('numero');
var b = document.getElementById('bairro');
var comp = document.getElementById('complemento');

const usuario = getUsuarioLogado();
var cadOuAt = false;

async function loadEnderecoEditar() {
    console.log("Carregando dados do endereço...");
    try {
        const usuarioEndereco = await ClienteService.buscarPorEmail(usuario);

        var codigo = usuarioEndereco.CODIGO;
        const end = await ClienteService.buscarEnderecoDoCliente(codigo);
        var enderecoDados = {};
        if (end && Array.isArray(end) && end.length > 0) {
            enderecoDados = end[0];  // Primeiro endereço
            console.log(end.CEP);  // Deve logar "13083-060"
        }
        if (!enderecoDados || enderecoDados.CEP === undefined || enderecoDados.CEP === null) {
            cep.value = "";
            r.value = "";
            c.value = "";
            e.value = "";
            n.value = "";
            comp.value = "";
            cadOuAt = false;
        }
        else {
            cep.value = enderecoDados.CEP;
            r.value = enderecoDados.RUA;
            c.value = enderecoDados.CIDADE;
            e.value = enderecoDados.ESTADO;
            n.value = enderecoDados.NUMERO;
            b.value = enderecoDados.BAIRRO;
            cadOuAt = true;
        }
    }
    catch (error) {
        console.error("Erro ao carregar dados do endereço:", error);
    }
}
loadEnderecoEditar();



document.getElementById('formEdicao').addEventListener('submit', async (event) => {
    event.preventDefault();

    const enderecoAtualizado = {
        CEP: cep.value,
        RUA: r.value,
        NUMERO: n.value,
        BAIRRO: b.value,
        CIDADE: c.value,
        CLIENTE_CODIGO: 0,
        ESTADO: e.value,
        PAIS: "Brasil",
        COMPLEMENTO: comp.value,
    };

    // Mostra loading
    Swal.fire({
        title: "Atualizando...",
        text: "Por favor, aguarde.",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        // pegarCodigo já faz a atualização e retorna o resultado
        const resultado = await pegarCodigo(enderecoAtualizado);
        
        // Fecha o loading
        Swal.close();

        const result = await Swal.fire({
            title: "Endereço atualizado!",
            text: "Seu endereço foi atualizado com sucesso.",
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
        // Fecha o loading em caso de erro
        Swal.close();
        
        console.error("Erro ao atualizar endereço:", error);
        
        await Swal.fire({
            title: "Erro!",
            text: error.message || "Erro ao atualizar endereço. Tente novamente.",
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

async function pegarCodigo(end) {

    try {
        if (!cadOuAt) {
            const usuarioDados = await ClienteService.buscarPorEmail(usuario);
            end.CLIENTE_CODIGO = usuarioDados.CODIGO;
            const resp = await ClienteService.criarEndereco(end);
            console.log(usuarioDados.CODIGO);
            return
        }
        else {
            const usuarioDados = await ClienteService.buscarPorEmail(usuario);
            const resp = await ClienteService.atualizarEndereco(usuarioDados.CODIGO, end);
            console.log(usuarioDados.CODIGO);
            return
        }
    }
    catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
    }
}

