1. Présentation de l’application

L’application mobile Ressource Relationnelle permet aux utilisateurs d’accéder facilement aux ressources disponibles depuis un téléphone. Elle permet notamment de se connecter, consulter les ressources, filtrer ou rechercher du contenu, voir les détails d’une ressource, lire les commentaires et interagir avec les contenus proposés.
Ce guide explique pas à pas comment installer, lancer et utiliser l’application mobile.

2. Prérequis avant l’installation

Avant de commencer, il faut avoir installé certains outils sur l’ordinateur.

2.1 Installer Node.js

L’application mobile utilise React Native avec Expo. Il faut donc installer Node.js.
Il est conseillé d’installer la version LTS de Node.js depuis le site officiel :
**https://nodejs.org/**

Après l’installation, il est possible de vérifier que Node.js est bien installé avec la commande suivante :
**node -v**

Il faut aussi vérifier que npm est installé :
**npm -v**

Si les deux commandes affichent une version, l’installation est correcte.

2.2 Installer Git

Git permet de récupérer le projet depuis GitHub.
Il peut être installé depuis le site officiel :
**https://git-scm.com/**

Pour vérifier que Git est bien installé :
**git --version**

2.3 Installer Expo Go sur le téléphone

Pour lancer l’application sur un téléphone, il faut installer l’application Expo Go.
Elle est disponible sur :
Android : Google Play Store
iPhone : App Store

Expo Go permet de scanner un QR code généré par le projet et d’ouvrir l’application directement sur le téléphone.

3. Récupération du projet
3.1 Cloner le projet

Ouvrir un terminal dans le dossier où le projet doit être installé, puis exécuter la commande suivante :
**git clone git@github.com:arnaudvlb/Ressources-Relationnelles-Front-Mobile.git**

Ensuite, entrer dans le dossier du projet :
**cd ressource-relationnelle-mobile**

3.2 Se placer sur la bonne branche

Si le projet utilise une branche spécifique, par exemple dev, il faut se placer dessus :
**git checkout dev**
Puis récupérer les dernières modifications :
**git pull**

4. Installation des dépendances

Une fois dans le dossier du projet, installer toutes les dépendances avec la commande suivante :
**npm install**

Cette commande installe tous les packages nécessaires au fonctionnement de l’application.
Il peut aussi être utile de vérifier que les dépendances Expo sont cohérentes avec la version du projet :
**npx expo install**

5. Configuration de l’API

L’application mobile communique avec une API. Il faut donc vérifier que l’adresse de l’API est correctement configurée.
Dans le projet, l’adresse de l’API se trouvedans un fichier de configuration :
**config/api.ts**

Il faut vérifier que l’URL correspond bien à l’adresse du serveur backend.
Il faut utiliser l’adresse IP locale de l’ordinateur.

Pour connaître l’adresse IP locale sur Windows, utiliser la commande :**ipconfig**
Puis récupérer l’adresse IPv4, par exemple :192.168.1.25
L’API doit être lancée sur cette adresse pour que le téléphone puisse communiquer avec elle.

6. Lancement de l’application

Pour lancer l’application mobile, utiliser la commande suivante :
**npx expo start**

Expo ouvre ensuite une interface dans le terminal avec un QR code.
Il faut ensuite ouvrir l’application Expo Go sur le téléphone et scanner le QR code.
L’application Ressource Relationnelle s’ouvre alors sur le téléphone.



6. Problèmes fréquents et solutions
6.1 L’application ne se lance pas

Si l’application ne se lance pas, vérifier que les dépendances sont bien installées :
**npm install**

Puis relancer Expo :
**npx expo start**

Si le problème continue, il est possible de vider le cache :
**npx expo start -c**

6.2 Le téléphone ne se connecte pas à l’application

Si Expo Go ne charge pas l’application, vérifier que :
le téléphone et l’ordinateur sont connectés au même réseau Wi-Fi ;
le QR code est bien scanné avec Expo Go ;
le pare-feu de l’ordinateur ne bloque pas la connexion ;
Expo est bien lancé dans le terminal.
6.3 L’API ne répond pas

Si l’application affiche une erreur réseau ou ne récupère aucune donnée, il faut vérifier que l’API backend est bien lancée.
Il faut aussi vérifier que l’URL de l’API est correcte dans la configuration du projet.
Sur téléphone, il ne faut pas utiliser :
http://localhost:8000
Il faut utiliser l’adresse IP locale de l’ordinateur, par exemple :
http://192.168.1.25:8000


7. Commandes utiles

Installer les dépendances :
**npm install**

Lancer l’application :
**npx expo start**

Lancer avec nettoyage du cache :
**npx expo start -c**

Récupérer les dernières modifications Git :
**git pull**

Changer de branche :
**git checkout nom-de-la-branche**

Voir la branche actuelle :
**git branch**

8. Résumé rapide de l’installation

Pour installer et lancer rapidement le projet :

git clone LIEN_DU_DEPOT_GITHUB
cd ressource-relationnelle-mobile
npm install
npx expo start

Ensuite :

ouvrir Expo Go sur le téléphone ;
scanner le QR code ;
attendre le chargement de l’application ;
se connecter avec un compte existant ;
utiliser l’application.
