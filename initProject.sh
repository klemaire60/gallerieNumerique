cp ./blank-config.json config.json;

npm i > /dev/null;
echo "Les dépendances ont bien été installées";

bash initDB.sh

echo "Le projet est prêt à tourner !";

sudo node server.js;
