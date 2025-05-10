document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get("id");

    fetch("../JS/bikes.json")
        .then(response => response.json())
        .then(data => {
            const bike = data.bikes.find(b => b.id == bikeId);
            if (bike) {
                const carouselInner = document.getElementById("carousel-images");
                const thumbnailContainer = document.getElementById("thumbnail-images");
                const bikeName = document.getElementById("bike-name");
                const bikeCode = document.getElementById("bike-code");
                const bikeCategory = document.getElementById("bike-category");
                const bikePrice = document.getElementById("bike-price");
                const bikeWheelSize = document.getElementById("bike-wheel-size");
                const bikeILAR = document.getElementById("bike-ilar");
                const bikeGearNumbers = document.getElementById("bike-nog");
                const bikeWeight = document.getElementById("bike-weight");
                const bikeDescription = document.getElementById("bike-description");

                carouselInner.innerHTML = ``;
                thumbnailContainer.innerHTML = ``;
                bikeCategory.innerHTML =  ``;
                bikeName.innerHTML = ``;
                bikeCode.innerHTML = ``;
                bikePrice.innerHTML = ``;
                bikeWheelSize.innerHTML = ``;
                bikeILAR.innerHTML = ``;
                bikeGearNumbers.innerHTML = ``;
                bikeDescription.innerHTML = ``;
                

                bike.images.forEach((image, index) => {
                    const activeClass = index == 0 ? "active" : "";
                    carouselInner.innerHTML += `
                        <div class="carousel-item ${activeClass}">
                            <img src="${image}" class="d-block w-100" alt="${bike.name}">
                        </div>
                    `;
                    thumbnailContainer.innerHTML += `
                        <img src="${image}" class="thumbnail-image mx-1" data-bs-target="#bike-carousel" data-bs-slide-to="${index}" style="width: 20%; cursor: pointer;">
                    `;
                });

                bikeCategory.innerHTML = `${bike.category}`;
                bikeName.innerHTML = `${bike.name}`;
                bikeCode.innerHTML = `${bike.code}`;
                bikePrice.innerHTML = `${bike.price}`;
                bikeWheelSize.innerHTML = `${bike.wheelSize}`;
                bikeILAR.innerHTML = `${bike.insideLegOrAgeRange}`;
                bikeGearNumbers.innerHTML = `${bike.gearNumbers}`;
                bikeWeight.innerHTML = `${bike.weight}`;
                bikeDescription.innerHTML = `${bike.description}`;


            } else {
                document.getElementById("carousel-images").innerHTML = "<p>Bisiklet bulunamadı!</p>";
            }
        })
        .catch(error => console.error("Veri yüklenirken hata oluştu:", error));
});
