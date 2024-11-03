const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const config = require("./config.json");

const app = express();
const app80 = express();

app.use(cors());
app.use(express.static('public'));

app80.use(cors());
app80.use(express.static('public'));

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
    res.sendFile(path.join(__dirname, 'index.html'));  // Sert index.html pour app80
});

app.listen(config.port, () => {
    console.log("Serveur en écoute sur le port", config.port);
});

app80.listen(80, () => {
    console.log("Serveur en écoute sur le port 80");
});
