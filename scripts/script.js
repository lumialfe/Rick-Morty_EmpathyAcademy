function showCharacters() {
    fetch("https://rickandmortyapi.com/api/character?name=" + currentName + "&page=" + currentPage)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json.results[0]);
            for(let i = 0; i < json.results.length; i++) {
                document.getElementById("characters").innerHTML += getCharacterCard(json.results[i]);
            }
            currentPage++
        });
}

function getCharacterCard(character) {
    let img = "<img class='card-image' src='" + character.image + "'/>"
    let name = "<p class='card-name'>" + character.name + "</p>"
    let description = "<p class='card-text'>Gender: " + character.gender + "<br/>"
        + "Status: " + character.status + "</br>"
        + "</p>"
    return "<div class='main-card'>" + img + name + description + "</div>"
}

function searchName() {
    currentName = document.getElementById("searchBar").value;
    currentPage = 1;
    document.getElementById("characters").innerHTML = "";
    showCharacters();
}

let currentPage = 1;
let currentName = "";
showCharacters("");
