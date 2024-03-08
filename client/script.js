// Sélectionne l'élément HTML avec l'ID "slider"
const div = document.querySelector("#slider");

// Crée un bouton pour reculer dans le slider
const btnReculer = document.createElement("button");
btnReculer.textContent = "<";
div.appendChild(btnReculer);

// Crée un conteneur pour l'image
const div_image = document.createElement("div");
div.appendChild(div_image);

// Crée une balise image
let monImage = document.createElement("img");
monImage.setAttribute("src", "../client/images/maison-bord-de-mer2.jpg");
div_image.appendChild(monImage);

// Crée un titre pour l'image
let monTitre = document.createElement("h2");
div_image.appendChild(monTitre);
monTitre.textContent = "Une pause au bord de la mer";
let autoplay = true;
// Définit une liste d'images avec leurs titres

let aListeImage = [
  {
    adresse: "maison-bord-de-mer2.jpg",
    titre: "Une pause au bord de la mer",
  },
  {
    adresse: "maison-campagne2.jpg",
    titre: "Une virée à la campagne",
  },
  {
    adresse: "la-maison-de-ville2.jpg",
    titre: "Un havre da paix en ville",
  },
  {
    adresse: "la-maison-en-montagne2.jpg",
    titre: "Un retour au source à la montagne",
  },
];

// Crée un bouton pour avancer dans le slider
const btnAvancer = document.createElement("button");
btnAvancer.textContent = ">";
div.appendChild(btnAvancer);

let position = 0;

// Fonction pour afficher une image dans le slider
const affiche = (step) => {
  // Met à jour la position
  console.log(step);
  position += step;
  console.log(position);
  if (position >= aListeImage.length) {
    position = 0;
  }
  if (position < 0) {
    position = aListeImage.length - 1;
  }
  console.log(position);

  // Met à jour l'image et son titre
  monImage.setAttribute(
    "src",
    "../client/images/" + aListeImage[position].adresse
  );
  monImage.setAttribute("alt", aListeImage[position].titre);
  monTitre.textContent = aListeImage[position].titre;
};

// Événement lorsque le bouton "Reculer" est cliqué
btnReculer.addEventListener("click", () => {
  affiche(-1), // Recule dans le slider
    (autoplay = false), // Arrête le défilement automatique
    (btnPlay.textContent = "Play"); // Change le texte du bouton Play
});

// Événement lorsque le bouton "Avancer" est cliqué
btnAvancer.addEventListener("click", () => {
  affiche(1), // Avance dans le slider
    (autoplay = false), // Arrête le défilement automatique
    (btnPlay.textContent = "Play"); // Change le texte du bouton Play
});

// Fonction pour exécuter le défilement automatique du slider
const runSlider = () => {
  if (autoplay) {
    affiche(1); // Avance dans le slider
    setTimeout(runSlider, 5000); // Démarre un nouveau défilement après 5 secondes
  }
};
runSlider(); // Démarre le défilement automatique initial

// Crée un bouton pour mettre en pause ou reprendre le défilement automatique
const btnPlay = document.createElement("button");
btnPlay.textContent = "Pause";
body.appendChild(btnPlay);
btnPlay.addEventListener("click", () => {
  autoplay = !autoplay; // Inverse l'état du défilement automatique
  runSlider(); // Redémarre le défilement automatique si autoplay est vrai
});
