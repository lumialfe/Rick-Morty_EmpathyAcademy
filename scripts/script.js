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
    let img = "<img class='card-image' src='" + character.image + "' alt='" + character.name + "'/>"
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

function clearFilters() {
    document.getElementById("filters").reset();
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

document.addEventListener('DOMContentLoaded', function() {
    let searchBar = document.getElementById("searchBar");
    searchBar.addEventListener('input', debounce(function() {
        searchName();
    }, 250));

    /**
     * Infinite Scrolling
     */
    window.onscroll = () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight - 200) {
            nextPage();
            let mybutton = document.getElementById("myBtn");
            mybutton.style.display = "block";
        }

        //TODO does not work
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) <= 500) {
            nextPage();
            let mybutton = document.getElementById("myBtn");
            mybutton.style.display = "none";
        }
    };

    document.getElementById("aside-button").addEventListener("click", function () {
        clearFilters();
    })
})
function topFunction() {
    let mybutton = document.getElementById("myBtn");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    mybutton.style.display = "none";
}


let currentPage = 1;
let currentName = "";
showCharacters();
