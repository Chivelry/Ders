var dongu = 1;

function kekDegis(){

    if(dongu == 1){
        document.getElementById("kekResim").src = "../IMG/Dankek_Uzumlu.jpg";
        document.getElementById("kekYazi").innerHTML = "Lokmalık Üzümlü";
        dongu++;
    }
    else if(dongu == 2){
        document.getElementById("kekResim").src = "../IMG/Dankek_HavucTarcinli.jpg";
        document.getElementById("kekYazi").innerHTML = "Lokmalık Havuçlu Tarçınlı";
        dongu++;
    }
    else if(dongu == 3){
        document.getElementById("kekResim").src = "../IMG/Dankek_HindistanCevizli.jpg";
        document.getElementById("kekYazi").innerHTML = "Lokmalık Hindistan Cevizli";
        dongu++;
    }
    else{
        document.getElementById("kekResim").src = "../IMG/Dankek_Kakaolu.jpg";
        document.getElementById("kekYazi").innerHTML = "Lokmalık Kakaolu";
        dongu = 1;
    }
}