const toggleLinks = document.querySelectorAll('.imgConta');
const popup = document.getElementById('popUp');




toggleLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        console.log("click")
        event.preventDefault();
        popup.classList.toggle('hidden');
    });
});

function closePopUp(){
    if (window.innerWidth < 451) {
        popup.classList.add('hidden');
    }
}

document.addEventListener('click', (event) => {
    if (!popup) return; // Proteção se o popup não existir
    
    const clickedOnToggle = [...toggleLinks].some(link => link.contains(event.target));
    const clickedOnPopup = popup.contains(event.target);
    
    if (!clickedOnToggle && !clickedOnPopup) {
        popup.classList.add('hidden');
    }
});

window.addEventListener('resize', closePopUp);