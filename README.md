# Ressources Relationnelles — Guide d’installation mobile
## 1. Présentation de l’application

L’application mobile Ressources Relationnelles permet aux utilisateurs d’accéder aux ressources depuis un téléphone.

Elle permet notamment de :

Se connecter
Consulter les ressources
Rechercher et filtrer du contenu
Voir le détail d’une ressource
Lire les commentaires
Interagir avec les contenus proposés

Ce guide explique comment installer, configurer et lancer l’application mobile avec React Native et Expo.

## 2. Prérequis

Avant de lancer le projet, il faut installer :

Node.js
npm
Git
Expo Go sur téléphone ou un émulateur mobile
Vérifier les installations
node -v
npm -v
git --version

Si les commandes affichent une version, les outils sont correctement installés.

## 3. Récupérer le projet

Cloner le dépôt GitHub :
git clone git@github.com:arnaudvlb/Ressources-Relationnelles-Front-Mobile.git

Entrer dans le dossier du projet :
cd Ressources-Relationnelles-Front-Mobile

Vérifier la branche actuelle :
git branch

Si besoin, se placer sur la branche principale :
git switch main

Récupérer les dernières modifications :
git pull origin main

## 4. Installer les dépendances

Depuis le dossier du projet, installer les dépendances :
npm install

Si besoin, vérifier les dépendances Expo :
npx expo install

## 5. Configurer l’API

L’application mobile communique avec une API.
L’adresse de l’API doit être configurée dans le projet dans :
config/api.ts

Sur mobile, il ne faut pas utiliser :
http://localhost:8000

car localhost correspond au téléphone et non à l’ordinateur.
Il faut utiliser l’adresse IP locale du PC qui lance l’API.

Exemple :
http://192.168.1.25:8000

Pour trouver l’adresse IP locale sur Windows :
ipconfig

Puis récupérer l’adresse IPv4.

Exemple de configuration :
const API_URL = "http://192.168.1.25:8000";

Le téléphone et l’ordinateur doivent être connectés au même réseau Wi-Fi.

## 6. Lancer l’application

Lancer Expo avec la commande :
npx expo start

Expo affiche ensuite un QR code dans le terminal.
Pour ouvrir l’application :

Ouvrir Expo Go sur le téléphone
Scanner le QR code
Attendre le chargement de l’application

## 7. Problèmes fréquents

### L’application ne se lance pas

Réinstaller les dépendances :
npm install

Relancer Expo :
npx expo start

Si le problème continue, vider le cache :
npx expo start -c

### Le téléphone ne se connecte pas à Expo

Vérifier que :

Le téléphone et le PC sont sur le même Wi-Fi
Expo est bien lancé dans le terminal
Le QR code est scanné avec Expo Go
Le pare-feu ne bloque pas la connexion
L’API ne répond pas

Vérifier que :

L’API backend est bien lancée
L’URL de l’API est correcte
Le téléphone et le PC sont sur le même réseau
L’adresse IP du PC est utilisée à la place de localhost

Exemple incorrect sur mobile :

http://localhost:8000

Exemple correct :

http://192.168.1.25:8000

## 8. Commandes utiles

Installer les dépendances :
npm install

Lancer l’application :
npx expo start

Lancer l’application avec nettoyage du cache :
npx expo start -c

Récupérer les dernières modifications :
git pull origin main

Voir la branche actuelle :
git branch

Changer de branche :
git switch nom-de-la-branche

## 9. Résumé rapide

Pour installer et lancer rapidement le projet :

git clone git@github.com:arnaudvlb/Ressources-Relationnelles-Front-Mobile.git
cd Ressources-Relationnelles-Front-Mobile
npm install
npx expo start

Ensuite :

Ouvrir Expo Go
Scanner le QR code
Attendre le chargement
Se connecter
Utiliser l’application
