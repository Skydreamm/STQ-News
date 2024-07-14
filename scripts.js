const articles = [
            {
                title: "Passage de la Flamme Olympique",
                images: ["Image/Logo JO.svg", "Image/Parcours JO.jpg"],
                description: "Retrouver ici le déroulement de la journée du passage de la Flamme Olympique.",
                detailedDescription: "En ce jour spécial,<p>La Flamme Olympique passera par plusieurs points clés de la ville, avec des festivités tout au long de la journée.<br> Ne manquez pas les spectacles de rue et les concerts gratuits organisés pour célébrer cet événement unique.</p>",
                date: new Date('2024-07-17')
            },
            {
                title: "Olympic Center",
                images: ["Image/Olympic Center.jpg", "path/to/another/image2.jpg"],
                description: "Le Centre Ville de Saint-Quentin se transforme en lieu olympique.",
                detailedDescription: "Voici le lieu où le sport est le sujet principale, venez vous initier avec des structures ludiques et sportives pour petits et grands.<br> Sans oublier un coin détente et farniente pour vous relaxer entre deux challenges.<p><strong>Rendez-vous sur la Place de l Hôtel de ville du mardi au dimanche de 14h à 19h !</strong></p>",
                date: new Date('2024-07-11')
            },
            {
                title: "Guide Estivale",
                images: [
                    "Image/STQ ete.jpg",
                    "https://www.calameo.com/read/004873246ccfefb67b7fc?authid=YOURS_AUTH_ID"
                ],
                description: "Voici les évênements qui a lieu sur Saint-Quentin.",
                detailedDescription: "Programme détaillé des événements possible sur la ville de Saint-Quentin",
                date: new Date('2024-07-11')
            },
            // Ajoutez plus d'articles ici
        ];

        function openPopup(title, images, detailedDescription) {
            document.getElementById('popup-title').innerText = title;
            const popupImages = document.getElementById('popup-images');
            popupImages.innerHTML = '';
            images.forEach(src => {
                if (src.includes('calameo.com')) {
                    const iframe = document.createElement('iframe');
                    iframe.src = src + '&authid=YOURS_AUTH_ID&view=slide&pagemode=none';
                    iframe.width = "100%";
                    iframe.height = "600px";
                    iframe.style.border = "none";
                    popupImages.appendChild(iframe);
                } else {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = `Image de ${title}`;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '600px';
                    img.onclick = (event) => {
                        event.stopPropagation();
                        openFullImagePopup(src);
                    };
                    popupImages.appendChild(img);
                }
            });
            document.getElementById('popup-description').innerHTML = detailedDescription;
            document.getElementById('popup').style.display = "block";
            document.getElementById('popup').addEventListener('click', closePopup);
        }

        function openFullImagePopup(src) {
            const fullImagePopup = document.getElementById('fullImagePopup');
            const fullImage = document.getElementById('fullImage');
            fullImage.src = src;
            fullImagePopup.style.display = "flex";
            fullImagePopup.addEventListener('click', closeFullImagePopup);
        }

        function closeFullImagePopup(event) {
            if (event.target === document.getElementById('fullImagePopup') || event.target.className === 'close') {
                document.getElementById('fullImagePopup').style.display = "none";
                document.getElementById('fullImagePopup').removeEventListener('click', closeFullImagePopup);
            }
        }

        function closePopup(event) {
            if (event.target === document.getElementById('popup') || event.target.className === 'close') {
                document.getElementById('popup').style.display = "none";
                document.getElementById('popup').removeEventListener('click', closePopup);
            }
        }

        function truncateDescription(description, wordLimit) {
            const words = description.split(' ');
            if (words.length > wordLimit) {
                return words.slice(0, wordLimit).join(' ') + '...';
            }
            return description;
        }

        function renderArticles() {
            const articlesContainer = document.getElementById('articles');
            articles.sort((a, b) => a.date - b.date);
            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.className = 'article';
                articleElement.onclick = () => openPopup(article.title, article.images, article.detailedDescription);
                articleElement.innerHTML = `
                    <h2>${article.title}</h2>
                    <img src="${article.images[0]}" alt="Image de ${article.title}">
                    <p class="description">${truncateDescription(article.description, 15)}</p>
                `;
                articlesContainer.appendChild(articleElement);
            });
        }

        renderArticles();