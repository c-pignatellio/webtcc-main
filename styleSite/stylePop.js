import { getLoggedIn, setLoggedIn, logout, getUsuarioLogado } from '../estadoLogin/estadoLogin.js'
import { ClienteService } from '../estadoLogin/clienteService.js';

var estadoLogin = getLoggedIn();
console.log(estadoLogin);

var login = document.getElementById("login");
var cadastro = document.getElementById("cadastro");
var minhaConta = document.getElementById("minhaConta");
var logoutP = document.getElementById("logout");
var imgMenu = document.querySelectorAll(".imgMenu");

if (estadoLogin) {
  minhaConta.style.display = "contents";
  logoutP.style.display = "contents";
  login.style.display = "none";
  cadastro.style.display = "none";
  imgMenu.forEach(imagem => {
    imagem.src = '../../public/imagens/perfildefault.jpg';
  });

  try {
    const u = getUsuarioLogado()
    const usuario = await ClienteService.buscarPorEmail(u);

    // Atualizar a imagem de perfil
    const urlImagem = ClienteService.getUrlImagemPerfil(usuario.URL_IMAGE);
    imgMenu.forEach(imagem => {
      imagem.src = urlImagem;
    });
    console.log("tem img estou mostrando")

    if (!urlImagem) {
      imgMenu.forEach(imagem => {
        imagem.src = '../../public/imagens/perfildefault.jpg';
      });
      console.log("não tem img estou mostrando")
    }

  } catch (error) {
    console.error('Erro ao carregar imagem:', error);
    imgMenu.forEach(imagem => {
      imagem.src = '../../public/imagens/perfildefault.jpg';
    });
  }
}

else if (!estadoLogin) {
  minhaConta.style.display = "none";
  logoutP.style.display = "none";
  login.style.display = "contents";
  cadastro.style.display = "contents";
}

document.getElementById('logout').addEventListener('click', function (e) {
  setLoggedIn(false);
  logout();
  window.location.href = "../../view/index/index.html"
});



