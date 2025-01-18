const uploadChoice = document.getElementById("uploadImagesChoice");
const createUserChoice = document.getElementById("createUserChoice");

const uploadForm = document.getElementById("uploadForm");
const createUserForm = document.getElementById("createUserForm");

function displayMenu(type) {
    uploadChoice.style.display = "none";
    createUserChoice.style.display = "none";
    
    if(type == "upload") {
        uploadForm.style.display = "flex";
        createUserForm.style.display = "none";
    }
    if(type == 'user') {
        uploadForm.style.display = "none";
        createUserForm.style.display = "flex";
    }
}

function sendForm(type) {
    const responseText = document.getElementById('responseText');
    
    if(type == "upload")
        {
        const form = document.getElementById(formType + 'Form');
        const formData = new FormData(form);
        
        const artType = document.querySelector('input[name="artType"]:checked');
        if (!artType) {
            alert('Veuillez sélectionner une catégorie.');
            return;
        }
        
        formData.append('artType', artType.value);
        
        fetch('/uploadImages', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                responseText.style.color = 'green';
                responseText.innerText = 'Votre fichier a été envoyé avec succès!';
            } else {
                responseText.style.color = 'red';
                responseText.innerText = 'Une erreur est survenue lors de l\'envoi.';
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            responseText.style.color = 'red';
            responseText.innerText = 'Une erreur est survenue lors de l\'envoi.';
        });
    } 
    else if(type == 'user')
        {
        
    }
}

function back() {
    uploadChoice.style.display = "flex";
    createUserChoice.style.display = "flex";
    
    uploadForm.style.display = "none";
    createUserForm.style.display = "none";
}

async function logout() {
    try {
        const logoutUrl = `${window.location.protocol}//${window.location.hostname}:3000/logout`;
        const response = await fetch(logoutUrl, {
                method: 'GET',
                credentials: 'include'
            });
        const data = await response.json();
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
};

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
        closeSidebar();
    }
    console.log(e.key)
}