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

fetch("http://localhost:3000/auth")
  .then((response) => {
    // Vérifie si la réponse est OK (statut 200-299)
    if (!response.ok) {
      throw new Error("Erreur réseau: " + response.statusText);
    }
    // Analyse la réponse JSON
    return response.json();
  })
  .then((data) => {
    // Faites quelque chose avec les données récupérées
    console.log(data);
  })
  .catch((error) => {
    // Attrape et gère les erreurs
    console.error("Erreur lors de la récupération des données:", error);
  });
