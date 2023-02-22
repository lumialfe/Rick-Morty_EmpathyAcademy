function showFirst() {
    const main = document.getElementById("main");
    //main.addEventListener("load", showAllCharacters())
}

function showAllCharacters() {
    fetch("https://rickandmortyapi.com/api/character")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json.results[0]);
            for(let i = 0; i < json.results.length; i++) {
                document.getElementById("characters").innerHTML += getCharacterCard(json.results[i]);
            }
        });
}

function getCharacterCard(character) {
    let img = "<img class='card-image' src='" + character.image + "'/>"
    let name = "<p class='card-name'>" + character.name + "</p>"
    let description = "<p class='card-text'>" + character.gender + "</p>"
    return "<div class='main-card'>" + img + name + description + "</div>"
}

showFirst();
showAllCharacters();