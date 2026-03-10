const aberto = '../../public/imagens/aberto.png';
const fechado = '../../public/imagens/fechado.png'; //sem visualizar a senha


const botao = document.getElementById("botao");
botao.addEventListener('click', clicar);

var olho = document.getElementById("olho");
olho.src = fechado;
var estado = "fechado";

const texto = document.getElementById("senha")//input que aparece a senha
texto.type = "password";

function clicar()
{
    
    if (estado == "aberto")
    {
        olho.src = fechado;
        texto.type = "password";//mudar o estilo pra nao aparecer a senha
        estado = "fechado"
    }

    else if(estado == "fechado")
    {
        olho.src = aberto;
        texto.type = "text";//mudar o estilo pra aparecer a senha
        estado = "aberto"

    }
}