function openPopup(title, images, description) {
    document.getElementById('popup-title').innerText = title;
    const popupImages = document.getElementById('popup-images');
    popupImages.innerHTML = '';
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image de ${title}`;
        img.onclick = (event) => {
            event.stopPropagation(); // Empêche la fermeture du popup lorsqu'on clique sur l'image
            window.open(src, '_blank');
        };
        popupImages.appendChild(img);
    });
    document.getElementById('popup-description').innerText = description;
    document.getElementById('popup').style.display = "block";

    // Ajouter un gestionnaire d'événement pour fermer le popup en cliquant à l'extérieur du contenu
    document.getElementById('popup').addEventListener('click', closePopup);
}

function closePopup(event) {
    if (event.target === document.getElementById('popup') || event.target.className === 'close') {
        document.getElementById('popup').style.display = "none";
        document.getElementById('popup').removeEventListener('click', closePopup);
    }
}
