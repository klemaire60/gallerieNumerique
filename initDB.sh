mysql -u root -p <<EOF

CREATE DATABASE gallerieNumerique;

USE gallerieNumerique2;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50),
	password VARCHAR(50)
);
EOF

echo "La base à bien été créée !";
