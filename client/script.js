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
  // console.log(step);
  position += step;
  // console.log(position);
  if (position >= aListeImage.length) {
    position = 0;
  }
  if (position < 0) {
    position = aListeImage.length - 1;
  }
  // console.log(position);

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

// Sélectionne le formulaire dans le document HTML
const form = document.querySelector("#form_recherche");
// Ajoute un écouteur d'événements pour la soumission du formulaire
form.addEventListener("submit", (e) => {
  // Empêche le comportement par défaut du formulaire (rechargement de la page)
  e.preventDefault();
  // Appelle la fonction handleSubmit lorsque le formulaire est soumis
  handleSubmit();
});

// Définition de la fonction handleSubmit
const handleSubmit = async () => {
  // Accéder aux valeurs des champs d'entrée
  // Accéder aux valeurs des champs d'entrée
  let destinationInput = document.getElementById("categorie").value;
  console.log("Valeur du champ destinationInput :", destinationInput);
  let adultsInput = document.getElementById("adulte").value;
  console.log("Valeur du champ adultsInput :", adultsInput);
  let childrenInput = document.getElementById("enfant").value;
  console.log("Valeur du champ childrenInput :", childrenInput);
  let petsInput = document.getElementById("animaux").value;
  console.log("Valeur du champ petsInput :", petsInput);

  // Affichage des valeurs dans la console

  // Convertir les valeurs numériques (string) en nombres entiers (integer) si nécessaire
  // Convertir les valeurs numériques (string) en nombres entiers (integer) si nécessaire
  let adultsValue =
    adultsInput.trim() !== "" ? parseInt(adultsInput, 10) : null;
  let childrenValue =
    childrenInput.trim() !== "" ? parseInt(childrenInput, 10) : null;
  let petsValue = petsInput.trim() !== "" ? parseInt(petsInput, 10) : null;

  // Affichage des valeurs converties dans la console

  // Afficher les valeurs dans la console (à titre d'exemple)
  console.log(destinationInput, adultsValue, childrenValue, petsValue);

  try {
    const response = await fetch(
      "http://127.0.0.1:3000/logement/recherche-logement",
      {
        method: "POST", // Utiliser la méthode POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categorie: destinationInput,
          adulte: adultsValue,
          enfant: childrenValue,
          animaux: petsValue,
        }),
      }
    );

    // Vérifie si la réponse est OK (statut 200-299)
    if (!response.ok) {
      throw new Error("Erreur réseau: " + response.statusText);
    }

    // Traiter les réponses JSON si nécessaire
    const data = await response.json();

    // Faites quelque chose avec les données récupérées
    console.log(data);

    // Rediriger vers la page d'accueil
    window.location.href = "recherche.html";
  } catch (error) {
    // Attrape et gère les erreurs
    console.error("Erreur lors de la récupération des données:", error);
  }
};
