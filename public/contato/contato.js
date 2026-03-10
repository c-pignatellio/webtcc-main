import { ClienteService } from '../estadoLogin/clienteService.js';

document.getElementById('formContato').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    formulario();
});

async function formulario() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var assunto = document.getElementById('assunto').value;
    var mensagem = document.getElementById('mensagem').value;
    var alerta = document.getElementById('alerta');
    alerta.innerHTML = '';

    if (nome === "" || email === "" || mensagem === "") {
        alerta.innerHTML = '<p style="font-size: 17px;color: red;">Por favor, preencha todos os campos obrigatórios.</p>';
        return;
    }
    else {
        const contato = {
            NOME: nome,
            EMAIL: email,
            ASSUNTO: assunto,
            MENSAGEM: mensagem
        }
        try {
            const r = await ClienteService.criarContato(contato);
            Swal.fire({
                icon: 'success',
                title: 'Mensagem enviada com sucesso!',
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
                    document.getElementById('formContato').reset();
                    return r;
                }

            });
            

        }
        catch (error) {
            alerta.innerHTML = '<p style="font-size: 17px;color: red;">Erro ao enviar mensagem. Tente novamente mais tarde.</p>';
            return;
        }


    }

    // enviar mensagem com todos os campos
}