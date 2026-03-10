import { getLoggedIn, getUsuarioLogado } from "../estadoLogin/estadoLogin.js";
import { ClienteService } from "../estadoLogin/clienteService.js";

var imgMenu = document.querySelectorAll('.imgMenu');
const imgDefault = '../../public/imagens/perfildefault.jpg'; // imagem default
const img = '../../public/imagens/jacinto.jpg'; // imagem homem

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const u = getUsuarioLogado()
    const usuario = await ClienteService.buscarPorEmail(u);

    // Atualizar a imagem de perfil
    const urlImagem = ClienteService.getUrlImagemPerfil(usuario.URL_IMAGE);
    document.getElementById('imagemCarregada').src = urlImagem;
console.log(urlImagem)
    if(!urlImagem)
    {
      document.getElementById('imagemCarregada').src = imgDefault;
    }

  } catch (error) {
    console.error('Erro ao carregar imagem:', error);
    document.getElementById('imagemCarregada').src = imgDefault;
  }
});

if (!getLoggedIn()) {
  imgMenu.forEach(imagem => {
    imagem.src = imgDefault;
  });
}
else if (getLoggedIn()) {


  document.getElementById("semImagem").addEventListener('click', excluirImagem);
  document.getElementById("inputFoto").addEventListener('change', exibirImagem);



  // pega a img do bd msm

  function exibirImagem(event) {
    const input = event.target;
    const imagemCarregada = document.getElementById('imagemCarregada');

    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = e.target.result;
        imagemCarregada.src = e.target.result;
        imagemCarregada.classList.add('show');
        adicionarImg(file);
        /*imgMenu.forEach(imagem => {
        imagem.src = e.target.result;
      });*/
        setFotoPerfil(img);
      };
      reader.readAsDataURL(file);
    }
  }


  async function excluirImagem() {
    if (true) {
      document.getElementById('imagemCarregada').src = imgDefault;

      imgMenu.forEach(imagem => {
        imagem.src = imgDefault;
      });
      const u = await ClienteService.buscarPorEmail(getUsuarioLogado())
      await ClienteService.removerImagemPerfil(u.CODIGO)
    }

  }

}

async function adicionarImg(img) {
  try {
    const u = await ClienteService.buscarPorEmail(getUsuarioLogado());

    await ClienteService.uploadImagemPerfil(u.CODIGO, img);

  }
  catch (e) {
    console.log("erro: " + e)
  }
}