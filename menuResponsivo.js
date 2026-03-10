var header           = document.getElementById('header');
var navigationHeader = document.getElementById('navegacao_header');
var content          = document.getElementById('container_');
var showSidebar      = false;


function toggleSidebar()
{
    showSidebar = !showSidebar;
    if(showSidebar)
    {
        navigationHeader.style.marginTop = '0';
        navigationHeader.style.animationName = 'showSidebar';
    }
    else
    {
        navigationHeader.style.marginTop = '-100vw';
        navigationHeader.style.animationName = '';
    }
}

function closeSidebar()
{
    if(window.innerWidth <= 450 && showSidebar)
    {
        toggleSidebar();
    }
}

function checkScreenSize() {
if (window.innerWidth > 450) {
    //navigationHeader.style.marginTop = '0';
   // navigationHeader.style.animationName = '';
} else {
    navigationHeader.style.marginTop = '-100vw';
}
}

window.addEventListener('resize', checkScreenSize);
window.addEventListener('load', checkScreenSize);