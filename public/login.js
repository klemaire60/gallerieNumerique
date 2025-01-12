const usernameLabel = document.getElementById('login-username');
const passwordLabel = document.getElementById('login-password');
const button = document.getElementById('login-button');
const responseDiv = document.getElementById('responseDiv');

button.addEventListener('click', async (event) => {
    const username = usernameLabel.value;
    const password = passwordLabel.value;

    try {
        const loginUrl = `${window.location.protocol}//${window.location.hostname}:3000/login`;
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        
        const data = await response.json();

        responseDiv.innerHTML = data.message;
        window.location.href = `/admin.html`
    } catch (error) {
        console.error('Erreur lors de la requête de connexion : \n', error);
    }
})

function showSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    // Afficher la sidebar et l'overlay
    sidebar.style.display = 'flex';
    overlay.style.display = 'block';
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    // Masquer la sidebar et l'overlay
    sidebar.style.display = 'none';
    overlay.style.display = 'none';
}