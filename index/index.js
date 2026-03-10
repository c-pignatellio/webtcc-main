import { ClienteService } from "../estadoLogin/clienteService.js";
import { PlantaService } from "../estadoLogin/plantaService.js";

async function carregarCarrossel() {
    try {
        const plantas = await PlantaService.buscarPlantas();
        const carrossel = document.getElementById('carrossel');
        if (plantas && plantas.length > 0) {
            // Generate HTML for plants
            carrossel.innerHTML = plantas
                .map((plant, index) => `
                    <div class="car_planta ${index === 1 ? 'central' : ''}" data-index="${index}">
                        <img src="${PlantaService.getUrlImagemPlanta(plant.URL_IMAGE)}" alt="${plant.NOME}">
                        <div class="txtCaro">
                            <div class="tituloCar">${plant.NOME.length > 12 ? plant.NOME.slice(0,12) + "..." : plant.NOME}</div>
                            <div class="texto">${plant.NOME_CIENTIFICO}</div>
                        </div>
                    </div>
                `)
                .join('');

            // Carrossel logic
            const slides = document.querySelectorAll('.car_planta');
            const totalSlides = slides.length;
            let currentIndex = 1; // Start with the second item as central (index 1)

            function updateCarrossel() {
                slides.forEach((slide, index) => {
                    slide.classList.remove('central');
                    // Calculate position: -1 (left), 0 (center), 1 (right)
                    const offset = index - currentIndex;
                    if (offset === 0) {
                        slide.classList.add('central'); // Central item
                        slide.style.transform = `translateX(0) scale(1.2)`;
                        slide.style.opacity = '1';
                        slide.style.zIndex = '10';
                    } else if (offset === -1) {
                        // Left item
                        slide.style.transform = `translateX(-400px) scale(1)`;
                        slide.style.opacity = '0.6';
                        slide.style.zIndex = '5';
                    } else if (offset === 1) {
                        // Right item
                        slide.style.transform = `translateX(400px) scale(1)`;
                        slide.style.opacity = '0.6';
                        slide.style.zIndex = '5';
                    } else {
                        // Hide other items
                        slide.style.transform = `translateX(${offset * 400}px) scale(1)`;
                        slide.style.opacity = '0';
                        slide.style.zIndex = '0';
                    }
                });
            }

            // Initial positioning
            updateCarrossel();

            // Autoplay: rotate every 3 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarrossel();
            }, 3000);

            window.dispatchEvent(new CustomEvent('plantasCarregadas', {
                detail: { quantidade: plantas.length }
            }));
        } else {
            carrossel.innerHTML = '<p>Nenhuma planta cadastrada...</p>';
        }
    } catch (error) {
        console.error('Erro ao carregar plantas:', error);
        carrossel.innerHTML = '<p>Erro ao carregar plantas. Tente novamente.</p>';
    }
}

carregarCarrossel();