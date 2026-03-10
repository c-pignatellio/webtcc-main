<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/style.css">
    <link rel="stylesheet" href="../../public/index/styleIndex.css">
    <link rel="icon" type="image/x-icon" href="../../public/imagens/favicon.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Página Inicial</title>
</head>
<body>

<?php
require '../menu/menu.html';

?>


<div class="container_" id="container_" tabindex="0" onfocus="closeSidebar()">
        <br>
        <div class="introducao">
            <div class="introducao1">
                <div class="tituloInicio">EcoStuff</div>
                <p>Desenvolvida por alunos em um trabalho de conclusão de curso, 
                  a EcoStuff é uma estufa integrada a um minhocário, que com um 
                  sistema inteligente, cuida de sua planta totalmente automatizada. 
                  Necessita de zero cuidado, e utiliza os nutrientes do minhocário 
                  para nutrir a planta, visando o futuro, automação e sustentabilidade.
                </p>
            </div>
            <div class="introducao2">
              <iframe src='https://my.spline.design/piplantas-5b8c0112d638e3780370c5554249f600/' frameborder='0' width='100%' height='100%'></iframe>
                <a href="../compre/compre.html">Compre já!</a>
            </div>
        </div>
        <div class="plantas">
          <div class="tituloPlantas">Algumas de nossas plantas</div>
          <div class="carrossel">
            <div class="carrossel-inner">
              <div class="car_planta" id="item-1">
                <img src="../../public/imagens/orquidea.jpg" alt="Orquídea">
                <div class="txtCaro">
                <div class="tituloCar">Orquídea Borboleta</div>
                <div class="texto">Phalaenopsis</div></div>
              </div>
              <div class="car_planta" id="item-2">
                <img src="../../public/imagens/tomate2.jpg" alt="Tomate">
                <div class="txtCaro">
                <div class="tituloCar">Tomate Roma</div>
                <div class="texto">Solanum lycopersicum</div></div>
              </div>

              <div class="car_planta" id="item-3">
                <img src="../../public/imagens/jacinto.jpg" alt="Rosa">
                <div class="txtCaro">
                <div class="tituloCar">Jacinto</div>
                <div class="texto">Hyacinthus orientalis</div></div>
              </div>
              
              <div class="car_planta" id="item-3">
                  <img src="../../public/imagens/morango.jpg" alt="Preto">
                  <div class="txtCaro">
                  <div class="tituloCar">Morango</div>
                  <div class="texto">Fragaria x ananassa</div></div>
                </div>
                <div class="car_planta" id="item-3">
                  <img src="../../public/imagens/samambaia.jpg" alt="Branco">
                  <div class="txtCaro">
                  <div class="tituloCar">Mini Samambaia</div>
                  <div class="texto">Nephrolepis </div></div>
                </div>
              <!-- Adicione quantas imagens precisar -->
            </div>
          </div>
        </div>


        <div class="comprar">
          <img src="../../public/imagens/estufa.jpg">
          <div class="comprar2">
            <div class="tituloComprar">Tenha uma EcoStuff</div>
          <p>
            Você pode ter uma EcoStuff! <br>
            Ao adquirir-lá, você está ajudando a espalhar 
            uma proposta mais sustentável para o cultivo 
            automatizado individual. Destacamos que a EcoStuff 
            está ainda sendo fabricada sob demanda, então sua 
            compra é ainda mais exclusiva!

          </p>

          <a href="../compre/compre.html">Compre já!</a>
        </div>
        </div>


        

        <div id="rodape">
          <div id = "tituloRodape">EcoStuff</div>
          <p>
            Alunos do curso de Desenvolvimento de <br> 
            Sistemas do Cotil (2023-2025)
          </p>
          <p>Desenvolvedores da EcoStuff:</p>
          <div class="desenvolvedores">
            <div class="single">
              <img src="../../public/imagens/cecilia.jpeg">
              <span class="nomeDes">Cecília Pignatelli</span>
              Desenvolvimento Web


            </div>

            <div class="single">
              <img src="../../public/imagens/feliepe.png">
              <span class="nomeDes">Felipe Cassio</span>
              Desenvolvimento Mobile e Arduíno


            </div>

            <div class="single">
              <img src="../../public/imagens/massari.jpg">
              <span class="nomeDes">Guilherme Massari</span>
            Desenvolvimento Desktop


            </div>

            <div class="single">
              <img src="../../public/imagens/samuel.jpg">
              <span class="nomeDes">Samuel Gilvane</span>
              Desenvolvimento Web


            </div>
            

          </div>
        </div>
    </div>


    
    
    <script src="../../public/scriptPopUp.js"></script>
    <script src="../../public/menuResponsivo.js"></script>
<script>
  let items = Array.from(document.querySelectorAll('.car_planta'));
  let currentIndex = 0;

  function updateCarrossel() {
    items.forEach((item) => {
      item.classList.remove('central');
      item.style.transform = '';
      item.style.opacity = '0';
    });

    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    const nextIndex = (currentIndex + 1) % items.length;

    // Lógica para telas menores ou maiores que 1042 pixels
    if (window.innerWidth < 1042) {
      items[prevIndex].style.transform = 'translateX(-200px) scale(0.8)';
      items[nextIndex].style.transform = 'translateX(200px) scale(0.8)';
    } else {
      items[prevIndex].style.transform = 'translateX(-400px) scale(0.8)';
      items[nextIndex].style.transform = 'translateX(400px) scale(0.8)';
    }

    if (window.innerWidth < 700) {
      items[prevIndex].style.transform = 'translateX(-50px) scale(0.8)';
      items[nextIndex].style.transform = 'translateX(50px) scale(0.8)';
    }

    //items[currentIndex].style.transform = 'translateX(0px) scale(1.2)';
    items[currentIndex].style.opacity = '1';
    items[currentIndex].classList.add('central');

    // Definindo a opacidade dos itens anterior e seguinte
    items[prevIndex].style.opacity = (window.innerWidth < 1042) ? '0' : '1';
    items[nextIndex].style.opacity = (window.innerWidth < 1042) ? '0' : '1';
  }

  function autoRotate() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarrossel();
  }

  let rotateInterval = setInterval(autoRotate, 3000);

  window.addEventListener('resize', updateCarrossel);

  updateCarrossel();
</script>


    </body>
</html>