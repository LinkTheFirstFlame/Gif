const div = document.querySelector("#communes")
const form = document.querySelector("form")

form.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("submit")
    div.innerHTML = null;
    var input = document.getElementById("recherche").value;
    //Verification de la saisie
    if (input == "") {
        newDiv = document.createElement("div")
        msg = "Erreur Veuillez remplir le formulaire"
        newDiv.innerHTML=`${msg}`
        newDiv.setAttribute('id','erreur')
        div.appendChild(newDiv)
        
    }

    console.log(input);

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=AQRlpOFY73tVKqTroLnLrEG07ktFfIRm&q=${input}&limit=25&offset=0&rating=g&lang=en`)
    .then((response) => response.json())
    .then((data) => {console.log(data)

        if (data.data.length == 0) {
            var newDivNoResultat = document.createElement("div")
            newDivNoResultat.setAttribute('id','NbNoResultat')
            newDivNoResultat.innerHTML = `<p>Aucun résulat correspondant </p>`;
            div.appendChild(newDivNoResultat)
            return 0
        }

        //Nombre de résultat
        console.log("Nombre de résultat"+ data.data.length)
        var newDivResultat = document.createElement("div")
        newDivResultat.setAttribute('id','NbResultat')
        newDivResultat.innerHTML = `<p>${data.data.length} résultats<p>`
        div.appendChild(newDivResultat);
        
        for(list_number of data.data){
            //Création des divs de stockages
            var newDiv = document.createElement("div")
            newDiv.setAttribute('id','test')

            newDiv.innerHTML =`<a href="${list_number.url}" target="_blank" id="img1">
            <img src="${list_number.images.fixed_height_small.url}" id="img2" width="${list_number.images.fixed_height_small.width}" height="${list_number.images.fixed_height_small.height}">
            </a>`; //Le nom du gif


            div.appendChild(newDiv);
        }  
    }) 

});