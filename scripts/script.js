function showCharacters() {
    fetch("https://rickandmortyapi.com/api/character?name=" + currentName + "&page=" + currentPage)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
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

function nextPage() {
    currentPage++;
    showCharacters();
}
const debounce = (func, delay) => {
    let debounceTimer
    return function() {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    let searchBar = document.getElementById("searchBar");
    searchBar.addEventListener('input', debounce(function() {
        searchName();
    }, 250));
    window.onscroll = () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight - 200) {
            nextPage();
        }
    };
})


let currentPage = 1;
let currentName = "";
showCharacters("");
