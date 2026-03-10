
import { getUsuarioLogado } from "../estadoLogin/estadoLogin.js";
import { ClienteService } from "../estadoLogin/clienteService.js";
import { PlantaService } from "../estadoLogin/plantaService.js";


const usuarioLogado = getUsuarioLogado();


document.addEventListener('DOMContentLoaded', async () => {

  var nome = "";
  var email = "";
  var primeiro = "";

  try {
    const uT = await ClienteService.buscarPorEmail(usuarioLogado);
    var endd = await ClienteService.buscarEnderecoDoCliente(uT.CODIGO);
    var end = {};
    if (endd && Array.isArray(endd) && endd.length > 0) {
      end = endd[0];  // Primeiro endereço
      console.log(end.CEP);  // Deve logar "13083-060"
    }
    //end = JSON.parse(end);
    nome = uT.NOME;
    email = usuarioLogado;
    primeiro = nome.split(' ')[0];


    document.getElementById("nomeUsuario").textContent = primeiro;

    document.getElementById("nomeCompleto").textContent = nome;

    document.getElementById("emailUsuario").textContent = email;

    console.log(uT.CODIGO);

    const plantas = await ClienteService.buscarPlantasDoCliente(uT.CODIGO);

    // getElementsByClassName retorna HTMLCollection, precisamos pegar o primeiro elemento
    const carrossel = document.getElementsByClassName("carrosselConta")[0];
    const car = document.getElementsByClassName("carrossel")[0];

    if (plantas === false) {
      // Não há plantas cadastradas (404)
      car.innerHTML = "<div class='naoTem'><p>Você não possui plantas cadastradas...</p><p>Tente acessar o aplicativo Mobile para adicionar uma nova planta.</p></div>";
    } else if (plantas && plantas.length > 0) {
      console.log(plantas);
      var p = plantas.map(plant => {
        PlantaService.getUrlImagemPlanta(plant.URL_IMAGE);
      });

      carrossel.innerHTML = 
      plantas.map(plant => `
        <div class="car_Conta">
          <img src="${PlantaService.getUrlImagemPlanta(plant.URL_IMAGE)}" alt="${plant.NOME}">
          <div class="car_Conta_Informacoes">
            <div class="tituloCar">${plant.NOME.length > 15 ? plant.NOME.slice(0, 12) + "..." : plant.NOME}</div>
            <div class="texto">${plant.NOME.length > 15 ? plant.OBSERVACOES.slice(0,60) + "..." : plant.OBSERVACOES.slice(0,90) + "..."}</div>
          </div>
        </div>
      `).join('');

      window.dispatchEvent(new CustomEvent('plantasCarregadas', {
        detail: { quantidade: plantas.length }
      }));

    } else {
      // Array vazio (caso a API retorne [] em vez de 404)
      car.innerHTML = "<div class='naoTem'><p>Você não possui plantas cadastradas...</p><p>Tente acessar o aplicativo Mobile para adicionar uma nova planta.</p></div>";
    }

    if (end.CEP === undefined || end.CEP === null) {
      document.getElementById("enderecoUsuario").textContent = "Nenhum endereço cadastrado.";
      // Pega o primeiro endereço, caso haja mais de um
    }
    else {
      document.getElementById("enderecoUsuario").textContent = `${end.RUA}, ${end.NUMERO} - ${end.CIDADE}, ${end.ESTADO} - CEP: ${end.CEP}`;

    }

  } catch (error) {
    console.error('Erro no carregamento:', error);

    // Mostra erro para o usuário
    const carrossel = document.getElementsByClassName("carrossel")[0];
    carrossel.innerHTML = `
        <p style="color: red;">Erro ao carregar plantas: ${error.message}</p>
        <button onclick="location.reload()">Tentar novamente</button>
    `;
  }

})






