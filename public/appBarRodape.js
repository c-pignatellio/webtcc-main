class AppBar extends HTMLElement{
    connectedCallback()
    {
        this.innerHTML = `
                 <div class="cabecalho" id="header">
                    <header class="header">
                    <a href="../index/index.html"><img src="../../public/imagens/logo.png" class="imgLogo"></a>
                    <a href="../index/index.html" class="cabecalhoTexto1 cabecalhoTexto">EcoStuff</a>
                    </header>
                    <header class="navegacao_header" id="navegacao_header">
                    <a href="#" class="imgConta cabecalhoTexto2"><img class="imgMenu"
                        src="../../public/imagens/perfildefault.jpg"></a>
                    <a href="../index/index.html" class="cabecalhoTexto2 cabecalhoTexto">EcoStuff</a>
                    <a href="../contato/contato.html">
                        <div class="cabecalhoTexto">Fale Conosco</div>
                    </a>
                    <a href="#" class="imgConta cabecalhoTexto1"><img class="imgMenu"
                        src="../../public/imagens/perfildefault.jpg"></a>
                    <button onclick="toggleSidebar()" class="btn_icon_header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x"
                        viewBox="0 0 16 16">
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                    </header>
                    <button onclick="toggleSidebar()" class="btn_icon_header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-list"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    </button>
                </div>
                <div id="popUp" class="hidden">
                    <div class="triangulo"></div>
                    <div id="popup">
                    <div id="login" style="font-weight: bold;"><a href="../login/login.html">Fazer login</a><br></div>
                    <div id="cadastro" style="font-weight: bold;"><a href="../cadastro/cadastro.html">Cadastro</a><br></div>
                    <div id="minhaConta" style="font-weight: bold;"><a href="../minhaConta/minhaConta.html">Minha conta</a><br></div>
                    <a id="logout" href="#">Sair</a>
                    </div>
                </div>
        ` 
    }
}

class Rodape extends HTMLElement{
    connectedCallback()
    {
        this.innerHTML = `
                <div id="rodape">
    <div id="tituloRodape">EcoStuff</div>
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
            Desenvolvimento Esp-32


        </div>

        <div class="single">
            <img src="../../public/imagens/massari.jpg">
            <span class="nomeDes">Guilherme Massari</span>
            Desenvolvimento Desktop


        </div>

        <div class="single">
            <img src="../../public/imagens/samuel.jpg">
            <span class="nomeDes">Samuel Gilvane</span>
            Desenvolvimento Mobile


        </div>
        <br><br>
        Note que, todos os alunos participaram do planejamento, pesquisa e todas as etapas do desenvolvimento. 
        Estes apontados são os responsáveis principais por cada parte do projeto.


    </div>
   
</div>

 <div class="powerBI">Tem interesse em nossas estatísticas? Acesse <a href="../powerBI/powerBI.html">esta página</a> para visualizar um relatório Power BI sobre a EcoStuff.</div>
        ` 
    }
}

customElements.define('app-bar',AppBar);
customElements.define('roda-pe',Rodape);