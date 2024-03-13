// Sélectionner les éléments nécessaires
const modal = document.getElementById("modal");
const btnOpenModal = document.getElementById("btn-open-modal");
const btnCloseModal = document.querySelector(".modal .close");
const form = document.querySelector("form");

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit(e);
});

// Faire le fetch avec les données du formulaire

const handleSubmit = async (e) => {
  // Récupérer les valeurs du formulaire
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:3000/auth", {
      method: "POST", // Utiliser la méthode POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Vérifie si la réponse est OK (statut 200-299)
    if (!response.ok) {
      throw new Error("Erreur réseau: " + response.statusText);
    }

    // Analyse la réponse JSON
    const data = await response.json();

    // Faites quelque chose avec les données récupérées
    console.log(data);

    // Rediriger vers la page d'accueil
    window.location.href = "index.html";
  } catch (error) {
    // Attrape et gère les erreurs
    console.error("Erreur lors de la récupération des données:", error);
  }
};
