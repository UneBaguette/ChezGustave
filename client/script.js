// Sélectionne l'élément HTML avec l'ID "slider"
const div = document.querySelector("#slider");
const sliderContainer = document.querySelector("#slider-container");

// Crée un bouton pour reculer dans le slider
const btnReculer = document.createElement("button");
btnReculer.textContent = "<";
btnReculer.classList.add("custom-button1"); // Ajoute une classe à l'élément
div.appendChild(btnReculer);

// Crée un conteneur pour l'image
const div_image = document.createElement("div");
div.appendChild(div_image);

// Crée une balise image
let monImage = document.createElement("img");
monImage.setAttribute("src", "../client/images/maison-bord-de-mer2.jpg");
div_image.appendChild(monImage);

// Crée un conteneur pour le titre de l'image
const div_titre = document.createElement("div");
div_titre.classList.add("slider-title");
div_image.appendChild(div_titre);

// Crée un titre pour l'image
let monTitre = document.createElement("h2");
div_image.appendChild(monTitre);
monTitre.textContent = "Une pause au bord de la mer";
// Ajoute le titre au conteneur du titre
div_titre.appendChild(monTitre);
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
    titre: "Un havre de paix en ville",
  },
  {
    adresse: "la-maison-en-montagne2.jpg",
    titre: "Un retour au source à la montagne",
  },
];

// Crée un bouton pour avancer dans le slider
const btnAvancer = document.createElement("button");
btnAvancer.textContent = ">";
btnAvancer.classList.add("custom-button2"); // Ajoute une classe à l'élément
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
    (autoplay = false); // Arrête le défilement automatique
  // (btnPlay.textContent = "Play"); // Change le texte du bouton Play
});

// Événement lorsque le bouton "Avancer" est cliqué
btnAvancer.addEventListener("click", () => {
  affiche(1), // Avance dans le slider
    (autoplay = false); // Arrête le défilement automatique
  // (btnPlay.textContent = "Play"); // Change le texte du bouton Play
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
btnPlay.textContent = "X";
btnPlay.classList.add("btn-pause"); // Ajoute une classe au bouton
// body.appendChild(btnPlay);
sliderContainer.appendChild(btnPlay); // Attache le bouton au conteneur du slider
btnPlay.addEventListener("click", () => {
  autoplay = !autoplay; // Inverse l'état du défilement automatique
  runSlider(); // Redémarre le défilement automatique si autoplay est vrai
});

// Sélectionner les éléments nécessaires
const modal = document.getElementById("modal");
const btnOpenModal = document.getElementById("btn-open-modal");
const btnCloseModal = document.querySelector(".modal .close");

// Fonction pour ouvrir la modale
function openModal() {
  modal.style.display = "block";
}

// Fonction pour fermer la modale
function closeModal() {
  modal.style.display = "none";
}

// Événement de clic sur le lien "Se connecter" pour ouvrir la modale
btnOpenModal.addEventListener("click", (event) => {
  event.preventDefault(); // Empêcher le comportement de lien par défaut
  openModal();
});

// Événement de clic sur le bouton de fermeture pour fermer la modale
btnCloseModal.addEventListener("click", closeModal);

// Événement de clic en dehors de la modale pour la fermer
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

const handleSubmit = async () => {
  // Accéder aux valeurs des champs d'entrée
  let destinationInput = document.getElementById("destination_name").value;
  let startDateInput = document.getElementById("start-date").value;
  let endDateInput = document.getElementById("end-date").value;
  let adultsInput = document.getElementById("adults").value;
  let childrenInput = document.getElementById("children").value;
  let petsInput = document.getElementById("pets").value;

  // Convertir les valeurs numériques si nécessaire
  let adultsValue = parseInt(adultsInput, 10);
  let childrenValue = parseInt(childrenInput, 10);
  let petsValue = parseInt(petsInput, 10);

  // Afficher les valeurs dans la console (à titre d'exemple)
  console.log(
    destinationInput,
    startDateInput,
    endDateInput,
    adultsValue,
    childrenValue,
    petsValue
  );
};
