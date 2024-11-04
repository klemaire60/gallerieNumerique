const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const config = require("./config.json");
const connection = require('./db')

const app = express();
const app80 = express();

app.use(cors());
app.use(express.static('public'));

app80.use(cors());
app80.use(express.static('public'));

function containsInvalidChars(input) {
    const forbiddenChars = /['";<>]/; // Liste des caractères interdits
    return forbiddenChars.test(input); // Renvoie true si un des caractères est trouvé
}

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    let errorMessage = '';
    
    if(!username) errorMessage += "Le nom d'utilisateur est manquant pour la connexion. ";
    if(!password) errorMessage += "Le mot de passe est manquant pour la connexion. ";
    if(username && containsInvalidChars(username)) errorMessage += "Le nom d'utilisateur contient des caractères interdit. ";
    if(password && containsInvalidChars(password)) errorMessage += "Le mot de passe contient des caractères interdits. ";

    if (errorMessage !== '') {
        return res.status(400).json({ message: errorMessage });
    }

    const sqlLogin = 'SELECT password FROM user WHERE usernmae = ?';

    connection.query(sqlLogin, [username], (err, results) => {
        if(err) {
            console.error("Erreur SQL lors de la requête sqlLogin\n erreur :\n", err);
            return res.status(500).json({message : "Erreur lors de la connexion"});
        }

        if(results.lenght == 0) 
        {
            return res.status(401).json({ message: "Aucun compte trouvé avec ce nom d'utilisateur"});
        }
        
        let token = jwt.sign({ mail }, config.jwtKey);
        res.cookie('userToken', token, {
            httpOnly: true,
            secure: false,
            maxAge: 43200000
        })
        return res.status(200).json({ message: "Connexion Réussie"});
    })
})

app.get('/images', async (req, res) => {
    const view = req.query.view;
    try {
        let images = [];
        const basePath = path.join(__dirname, 'public', 'img');

        if (view === 'numeric') {
            const numericImages = await fs.readdir(path.join(basePath, 'numericArt'));
            images = numericImages.map(file => `/img/numericArt/${file}`);
        } else if (view === 'draws') {
            const drawImages = await fs.readdir(path.join(basePath, 'draws'));
            images = drawImages.map(file => `/img/draws/${file}`);
        } else {
            const numericImages = await fs.readdir(path.join(basePath, 'numericArt'));
            const drawImages = await fs.readdir(path.join(basePath, 'draws'));

            images = [
                ...numericImages.map(file => `/img/numericArt/${file}`),
                ...drawImages.map(file => `/img/draws/${file}`)
            ];
        }

        res.json({ images });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Erreur lors du chargement des images" });
    }
});

app80.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'index.html'));
});

app80.get('/gallerie.html', (req, res) => {
    return res.sendFile(path.join(__dirname, 'gallerie.html'))
})

app.listen(config.port, () => {
    console.log("Serveur en écoute sur le port", config.port);
});

app80.listen(80, () => {
    console.log("Serveur en écoute sur le port 80");
});
