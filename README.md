# Site de mariage — Julie & Thomas

Site statique (HTML/CSS/JS, aucune installation requise) avec animation
d'enveloppe interactive, faire-part, compte à rebours, formulaire RSVP,
page d'infos pratiques et galerie photos.

Thème visuel : ambiance plage/tropicale (turquoise, corail, sable),
inspirée du frangipanier et de la planche de surf — motifs décoratifs
en SVG maison (aucune image de marque utilisée).

## Aperçu en local

Le site tourne déjà en local pendant cette session à cette adresse :
http://localhost:8123/index.html

Pour le relancer plus tard (depuis le dossier du site) :

```
python3 -m http.server 8123
```

Puis ouvrez http://localhost:8123 dans votre navigateur. Vous pouvez aussi
simplement double-cliquer sur `index.html` pour l'ouvrir directement, mais
un petit serveur local est plus fiable pour tester la galerie photo.

## ⚠️ Étape obligatoire : activer l'envoi d'email (FormSubmit)

C'est le service qui envoie un email à chaque réponse RSVP. **100% gratuit,
sans compte à créer, sans carte bancaire** — il suffit d'une adresse email.

Le formulaire est déjà configuré pour envoyer à **julie78.thibaut@gmail.com**
(fichier `index.html`, ligne
`action="https://formsubmit.co/ajax/julie78.thibaut@gmail.com"`).
Si vous voulez changer d'adresse plus tard, remplacez-la simplement à cet
endroit.

1. La toute première fois que quelqu'un envoie le formulaire (vous y
   compris, pour tester), FormSubmit envoie un email à
   julie78.thibaut@gmail.com avec un lien **"Activate Form"**.
2. Cliquez sur ce lien une seule fois : c'est tout, l'activation est
   définitive.
3. À partir de là, chaque réponse au RSVP vous enverra automatiquement un
   email récapitulatif (nom, présence, nombre de personnes, allergies,
   message).

Aucun tableau de bord à consulter : tout arrive directement par email.

## Modifier les informations du mariage

Tout est en texte simple dans les fichiers, facilement modifiable :

- **Prénoms affichés** : fichier `index.html` (section "ENVELOPPE").
- **Détails pratiques** (horaires, dress code, adresse) : fichier
  `infos.html`.
- **Date limite de réponse** : apparaît dans `index.html` et `infos.html`
  ("avant fin février 2026").

## Ajouter vos photos

1. Déposez vos images dans le dossier `images/gallery/` (créez-le si besoin).
2. Ouvrez `js/script.js`, repérez la liste `GALLERY_IMAGES` en bas du
   fichier, et ajoutez le chemin de chaque photo, par exemple :
   ```js
   const GALLERY_IMAGES = [
     'images/gallery/photo-1.jpg',
     'images/gallery/photo-2.jpg',
   ];
   ```
3. Elles apparaîtront automatiquement dans la page "Photos".


## Ajouter la musique (lecteur vinyle)

Un vinyle cliquable est déjà en place en bas à droite de chaque page : il
tourne et lance/coupe la musique au clic (pas de lecture automatique au
chargement, ce que les navigateurs bloquent de toute façon sans interaction).

1. Choisissez votre morceau (le vôtre, ou un titre libre de droits si vous
   comptez publier le site publiquement — attention à ne pas utiliser un
   morceau protégé sans autorisation).
2. Exportez-le en MP3 et déposez le fichier dans `music/song.mp3`
   (créez le dossier `music/` s'il n'existe pas).
3. C'est tout : le vinyle jouera automatiquement ce fichier au clic.

Remarque : le site étant composé de plusieurs pages HTML classiques, la
musique s'arrête si l'invité change de page (Accueil → Infos → Photos).
Dites-le-moi si vous préférez que la musique continue en changeant de page
— c'est possible mais demande une architecture un peu différente (site en
une seule page, ou lecteur persistant).

## Mettre le site en ligne

Le site est 100% statique (pas de serveur, pas de base de données) donc il
peut être hébergé n'importe où très simplement :

- **Netlify** (le plus simple) : allez sur https://app.netlify.com/drop et
  glissez-déposez le dossier `site-mariage` entier. Le site est en ligne en
  quelques secondes avec une URL gratuite (modifiable ensuite).
- **Votre domaine OVH existant** : si vous avez déjà un nom de domaine chez
  OVH, vous pouvez envoyer les fichiers du dossier (index.html, infos.html,
  photos.html, css/, js/, images/) via l'hébergement web OVH (FTP ou
  gestionnaire de fichiers), à la racine de votre site. Dites-moi si vous
  voulez de l'aide pour cette étape, je peux vous guider pas à pas.
- **Vercel** : fonctionne aussi très bien pour un site statique, via
  glisser-déposer sur https://vercel.com/new ou en connectant un dépôt Git.

## Structure du projet

```
site-mariage/
├── index.html      → page d'accueil (enveloppe + faire-part + RSVP)
├── infos.html       → informations pratiques + plan d'accès
├── photos.html       → galerie photo
├── css/style.css     → tous les styles
├── js/script.js      → animation, compte à rebours, formulaire, galerie
└── images/gallery/   → à créer, pour vos photos
```
