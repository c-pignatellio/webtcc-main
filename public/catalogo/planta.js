import { PlantaService } from "../estadoLogin/plantaService.js";

document.addEventListener('DOMContentLoaded', async function() {
    const p = new URLSearchParams(window.location.search);
    const id = p.get('id');

    try{

        const planta = await PlantaService.buscarPlantaPorCodigo(id);
        const doencas = await PlantaService.buscarDoenca(id);
        console.log(doencas.NOME)
        planta.NOME ? document.getElementById('tituloCat').textContent = planta.NOME : document.getElementById('tituloCat').textContent = "Ops... Não encontramos esta planta";
        document.getElementById('descricao').textContent = planta.OBSERVACOES;
        planta.URL_IMAGE ? document.getElementById('imgPlanta').src = PlantaService.getUrlImagemPlanta(planta.URL_IMAGE) : document.getElementById('imgPlanta').src = "../../public/imagens/jacinto.jpg";
        document.getElementById('nome_cientifico').textContent = planta.NOME_CIENTIFICO;
        document.getElementById('clima').textContent = planta.CLIMA;


        if (doencas && doencas.length > 0) {
            // Se for array, pega a primeira doença
            const primeiraDoenca = Array.isArray(doencas) ? doencas[0] : doencas;
            
            document.getElementById('nome').textContent = primeiraDoenca?.NOME || 'Não informado';
            document.getElementById('sintomas').textContent = primeiraDoenca?.SINTOMAS || 'Não informado';
            document.getElementById('agente').textContent = primeiraDoenca?.CAUSAS || 'Não informado';
        } else {
            // Caso não tenha doenças
            document.getElementById('nome').textContent = 'Nenhuma doença registrada';
            document.getElementById('sintomas').textContent = 'Nenhum sintoma registrado';
            document.getElementById('agente').textContent = 'Nenhum agente causador registrado';
        }



    }
    catch(e){
        console.error(e);
    }

})