import { PlantaService } from "../estadoLogin/plantaService.js";

// Delegação de eventos como fallback
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        const tile = event.target.closest('.listTile');
        
        if (tile) {
            navegarParaPlanta(tile.id);
        }
    });
});

async function carregarPlantas() {
    try {
        const plantas = await PlantaService.buscarPlantas();
        const lista = document.getElementById('lista');

        if (plantas && plantas.length > 0) {
            lista.innerHTML = plantas
                .map((plant) => `
                    <div class="listTile" id="${plant.CODIGO}">
                        <img src="${PlantaService.getUrlImagemPlanta(plant.URL_IMAGE)}">
                        <div class="infos">
                        <div class="tileTitulo">${plant.NOME}</div>
                        <div class="tileTxt">${plant.OBSERVACOES}</div>
                    </div></div>
                `)
                .join('');

            // Atribui eventos diretamente também
            atribuirEventosTiles();
        }

    }
    catch (e) {
        console.error(e);
    }
}

function atribuirEventosTiles() {
    const tiles = document.querySelectorAll('.listTile');
    
    tiles.forEach(tile => {
        // Remove event listeners anteriores para evitar duplicação
        tile.replaceWith(tile.cloneNode(true));
    });
    
    // Re-seleciona os tiles após o clone
    const novosTiles = document.querySelectorAll('.listTile');
    
    novosTiles.forEach(tile => {
        tile.addEventListener('click', function() {
            navegarParaPlanta(this.id);
        });
    });
}

function navegarParaPlanta(id) {
    const p = new URLSearchParams({ id: id });
    window.location.href = `../../view/catalogo/planta.html?${p.toString()}`;
}

carregarPlantas();