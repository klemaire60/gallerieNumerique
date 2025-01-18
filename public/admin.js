const uploadChoice = document.getElementById("uploadImagesChoice");
const createUserChoice = document.getElementById("createUserChoice");

const uploadForm = document.getElementById("uploadForm");
const createUserForm = document.getElementById("createUserForm");
const responseText = document.getElementById("responseText");

function displayMenu(type) {
    // Réinitialiser l'affichage
    uploadChoice.style.display = "none";
    createUserChoice.style.display = "none";
    uploadForm.style.display = "none";
    createUserForm.style.display = "none";

    // Supprimer les anciens gestionnaires
    document.removeEventListener('keydown', handleFormSubmit);

    if (type === "upload") {
        uploadForm.style.display = "flex";
        // Ajouter un gestionnaire pour la soumission via "Entrée"
        document.addEventListener('keydown', handleFormSubmit);
    } else if (type === "user") {
        createUserForm.style.display = "flex";
        document.addEventListener('keydown', handleFormSubmit);
    }
}

function handleFormSubmit(event) {
    if (event.key === 'Enter') {
        const activeForm = uploadForm.style.display === "flex" ? "upload" : "user";
        sendForm(activeForm);
    }
}

function sendForm(type) {
    if (type === "upload") {
        const form = document.getElementById(type + 'Form');
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
    } else if (type === "user") {
        // Ajoutez ici la logique pour la création d'utilisateur.
        alert("Logic de création d'utilisateur à implémenter !");
    }
}

function back() {
    uploadChoice.style.display = "flex";
    createUserChoice.style.display = "flex";
    uploadForm.style.display = "none";
    createUserForm.style.display = "none";

    // Supprimer les anciens gestionnaires
    document.removeEventListener('keydown', handleFormSubmit);
}

async function logout() {
    try {
        const logoutUrl = `${window.location.protocol}//${window.location.hostname}:3000/logout`;
        await fetch(logoutUrl, {
            method: 'GET',
            credentials: 'include',
        });
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
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
        closeSidebar();
    }
}