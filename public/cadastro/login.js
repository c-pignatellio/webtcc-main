import { setLoggedIn, getLoggedIn, logout, getUsuarioLogado } from "../estadoLogin/estadoLogin.js";
import { setUsuarioLogado } from "../estadoLogin/estadoLogin.js";
import { ClienteService } from "../estadoLogin/clienteService.js"



/////////////////////////////////////////////////


var login;


export function fazerLogin(event) {
    login = getLoggedIn();
    console.log("estado do login" + login);
    console.log("entrou no fazerLogin");
    event.preventDefault();
    var check = false;

    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var styleEmail = document.getElementById("email").style;
    var styleSenha = document.getElementById("senha").style;
    var msgSenha = document.getElementById("msgSenha");

    styleSenha.borderColor = "black";
    msgSenha.textContent = "";




    if (email == "" || senha == "") {
        return "CAMPOS VAZIOS";
    }
    else if (email == null || senha == null) {
        return "CAMPOS NULOS";
    }

    else {
        if (login) {
            console.log("JA TEM LOGIN");
            return "JA TEM LOGIN";
        }

        if (!login) {


            if (senha.length < 5) {
                console.log("A SENHA DEVE TER MAIS DE CINCO CARACTERES");
                styleSenha.borderColor = "red";
                msgSenha.textContent = "A senha deve ter mais de cinco caracteres!";
                limpar(1);
                return "A SENHA DEVE TER MAIS DE CINCO CARACTERES";
            }


            check = true;

            handleLogin(email, senha)
        }
    }
}

////////////////////////////////////////////////

function limpar(campos) {

    if (campos == 1) {

        document.getElementById("senha").value = "";
    }


    else if (campos == 2) {
        document.getElementById("email").value = "";
        document.getElementById("senha").value = "";
    }
}

////////////////////////////////////////////////

async function handleLogin(email, senha) {
    try {
        const resultado = await ClienteService.fazerLogin(email, senha);

        if (resultado.success) {
            // Login bem-sucedido
            

            setLoggedIn(true);

            setUsuarioLogado(email);
            console.log("LOGIN");
            window.location.href = "../minhaConta/minhaConta.html";

            return "LOGIN";

            // Redirecionar ou atualizar estado da aplicação
            //window.location.href = '/dashboard';

        } else {
            // Login falhou
            console.log(resultado.error)

            switch (resultado.error) {

                case 'MISSING_CREDENTIALS':
                    console.log('Email e senha são obrigatórios');
                    msgSenha.textContent = "Preencha os campos!";
                    return;

                case 'INVALID_EMAIL_FORMAT':
                    console.log('Formato de email inválido');
                    msgSenha.textContent = "Formato de e-mail inválido.";
                    styleEmail.borderColor = "red";
                    return;

                case 'INVALID_PASSWORD_LENGTH':
                    console.log('Senha deve ter pelo menos 5 caracteres');
                    styleSenha.borderColor = "red";
                    msgSenha.textContent = "A senha deve ter mais de cinco caracteres!";
                    limpar(1);
                    return;

                    
                case 'Cliente não encontrado':
                    console.log('Email não encontrado');
                    msgSenha.textContent = "O e-mail informado não está cadastrado.";
                    limpar(2);
                    return;
                    
                case 'Senha incorreta':
                    console.log('Senha incorreta');
                    msgSenha.textContent = "A senha e o e-mail não são compatíveis.";
                    limpar(2);
                    return;
                
                default:
                    console.log('Erro desconhecido durante o login, tente novamente mais tarde');
                    limpar(2);
                    return;
            }

        }

    } catch (error) {
        console.error('Erro durante o login:', error);
        return {
            success: false,
            error: 'Erro inesperado durante o login',
            user: null
        };
    }
}

////////////////////////////////////////////////

function mudar() {
    window.location.href = "../minhaConta/minhaConta.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', fazerLogin);
    }
});

