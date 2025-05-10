document.addEventListener("DOMContentLoaded", () => {
    fetch("../JS/bikes.json") // JSON verisini al
        .then(response => response.json())
        .then(data => {
            const catalogueContainer = document.getElementById("bike-catalogue");
            catalogueContainer.innerHTML = ""; // Önce temizle

            data.bikes.forEach(bike => {
                catalogueContainer.innerHTML += `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card">
                            <a href="bike-details.html?id=${bike.id}">
                                <img src="${bike.images[0]}" class="card-img-top" alt="${bike.name}">
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">${bike.name}</h5>
                                <p class="card-text">Kategori: ${bike.category}</p>
                                <p class="card-text"><strong>${bike.price}</strong></p>
                            </div>
                        </div>
                    </div>
                `;
            });

        })
        .catch(error => console.error("Veri yüklenirken hata oluştu:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    let maxHeight = 0;

    cards.forEach(card => {
        if (card.offsetHeight > maxHeight) {
            maxHeight = card.offsetHeight;
        }
    });

    cards.forEach(card => {
        card.style.height = maxHeight + "px";
    });
});
