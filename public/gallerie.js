// Gallerie.html
const params = new URLSearchParams(window.location.search);

const category = params.get('view');
loadImages(category);

async function loadImages(category) {
    try {
        const url = new URL(`/images`, `http://172.25.121.6:3000`);
        
        url.searchParams.append('view', category);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des images');
        }
        
        const data = await response.json();
        var imagesHTML = ``;
        
        data.images.forEach(image => {
            imagesHTML += `
                <div class="thumbnail" onclick="openModal(this)">
                    <img src="${image}" alt="Image">
                </div>
            `;
        });
        
        document.getElementById('gallery').innerHTML = imagesHTML;
    } catch (error) {
        console.error(error);
    }
}

function openModal(thumbnail) {
    var modal = document.getElementById("myModal");
    var img = modal.querySelector("#img01");
    
    var imgElement = thumbnail.querySelector("img");
    
    img.src = imgElement.src;
    
    modal.style.display = "block";
    
    img.onload = function() {
        var imgHeight = img.naturalHeight;
        
        var windowHeight = window.innerHeight;
        
        var marginTop = Math.abs((windowHeight - imgHeight) / 2);
        
        // Appliquer la marge calculée à l'image
        img.style.marginTop = marginTop + "px";
        
        document.addEventListener('keydown', handleEscape);
    };
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.removeEventListener('keydown', handleEscape);
}

function showSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    // Afficher la sidebar et l'overlay
    sidebar.style.display = 'flex';
    overlay.style.display = 'block';

    document.addEventListener('keydown', handleEscape);
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    // Masquer la sidebar et l'overlay
    sidebar.style.display = 'none';
    overlay.style.display = 'none';
    document.removeEventListener('keydown', handleEscape);
}

function handleEscape(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById("myModal");
        const sidebar = document.getElementById("sidebar");

        // Fermer la modal si elle est ouverte
        if (modal.style.display === "block") {
            closeModal();
        }

        // Fermer la sidebar si elle est ouverte
        if (sidebar.style.display === "flex") {
            closeSidebar();
        }
    }
    console.log(e.key)
}
