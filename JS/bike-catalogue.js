//Katalog Default Getirme Aşaması
document.addEventListener("DOMContentLoaded", () => {
    fetch("../JS/bikes.json")
        .then(response => response.json())
        .then(data => {
            window.bikes = data.bikes; //Bisiklet Verisini Kaydetme
            document.getElementById("categoryDropdown").innerText = "Tüm Bisikletler"; //Varsayılan Kategori
            document.getElementById("brandDropdown").innerText = "Tüm Markalar"; //Varsayılan Marka
            document.getElementById("priceDropdown").innerText = "Tüm Fiyatlar"; //Varsayılan Fiyat
            updateCatalogue(); //İlk Yüklemede Katalog Getirme
        })
        .catch(error => console.error("Bisiklet JSON yükleme hatası:", error));
});

//Filtrelerin Seçilme Durumları (Çoklu ve Tekli)
document.addEventListener("DOMContentLoaded", () => {
    fetch("../JS/filters.json")
        .then(response => response.json())
        .then(filterData => {
            populateDropdown(["Tüm Bisikletler", ...filterData.categories], "categoryList", "categoryDropdown"); //Kategorile
            populateDropdown(["Tüm Markalar", ...filterData.brands], "brandList", "brandDropdown"); //Markalar
            populateDropdown(["Tüm Fiyatlar", ...filterData.priceRanges], "priceList", "priceDropdown"); //Fiyatlar
        })
        .catch(error => console.error("Filtreler yüklenirken hata oluştu:", error));
});

//Filtrelerin Seçeneklerinin Ayarlanması
function populateDropdown(items, listId, buttonId) {
    const list = document.getElementById(listId);
    list.innerHTML = "";

    //Her Filtre Seçeneğine Göre List Item
    items.forEach(item => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<a class="dropdown-item" href="#">${item}</a>`;
        listItem.addEventListener("click", () => {
            document.getElementById(buttonId).innerText = item;        
            updateCatalogue();
        });
        list.appendChild(listItem);
    });
}

//Seçimden Sonra Çalışan Fonksiyon
function updateCatalogue() {
    const catalogueContainer = document.getElementById("bike-catalogue");
    catalogueContainer.innerHTML = "";

    //Seçili Filtreleri Alma
    let selectedCategory = document.getElementById("categoryDropdown").innerText;
    let selectedBrand = document.getElementById("brandDropdown").innerText;
    let selectedPrice = document.getElementById("priceDropdown").innerText;

    //Seçilenlere Göre Filtre Uygulanması
    let filteredBikes = window.bikes.filter(bike => {
        return (selectedCategory === "Tüm Bisikletler" || bike.category === selectedCategory) &&
               (selectedBrand === "Tüm Markalar" || bike.brand === selectedBrand) &&
               (selectedPrice === "Tüm Fiyatlar" || checkPriceRange(bike.price, selectedPrice));
    });

    //Seçilen Filtrelerin Getirdiği Bisiklet Sayısı 0 İse Çalışacak Komut
    if (filteredBikes.length === 0) {
        //Bisiklet Bulunamadı
        catalogueContainer.innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 50vh;">
            <span class="text-center text-muted fs-3">Uygun bisiklet bulunamadı.</span>
        </div>
        `;
        return;
    }

    //Filtrelenmiş Bisikletlerin Kard Olarak Ekrana Getirilmesi
    filteredBikes.forEach(bike => {
        catalogueContainer.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card">
                    <a href="bike-details.html?id=${bike.id}">
                        <img src="${bike.images[0]}" class="card-img-top" alt="${bike.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${bike.name}</h5>
                        <p class="card-text">Marka: ${bike.brand}</p>
                        <p class="card-text"><strong>${bike.price}</strong></p>
                    </div>
                </div>
            </div>
        `;
    });
}

//Fiyat Aralıklarını Belirleme
function checkPriceRange(price, selectedRange) {

    //JSON'daki Metini Sayısal Değere Dönüştürme
    let numericPrice = parseInt(price.replace("£", "").replace(",", ""));
    
    //Dönüşen Değeri Kategori Seçeneğiyle Eşleme ve Eşlenen Değeri Filtre Uygulamasına Döndürme
    switch (selectedRange) {
        case "0-500£": return numericPrice >= 0 && numericPrice <= 500;
        case "500£-1000£": return numericPrice > 500 && numericPrice <= 1000;
        case "1000£-2000£": return numericPrice > 1000 && numericPrice <= 2000;
        case "2000£+": return numericPrice > 2000;
        default: return true;
    }
}

//Kardların Yükselik Ayarlamaları
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    let maxHeight = 0;

    //En Yüksek Boyutlu Kartın Yüksekliğini Bulma
    cards.forEach(card => {
        if (card.offsetHeight > maxHeight) {
            maxHeight = card.offsetHeight;
        }
    });
    //Bütün Kartları En Yüksek Olana Ayarlama
    cards.forEach(card => {
        card.style.height = maxHeight + "px";
    });
});

