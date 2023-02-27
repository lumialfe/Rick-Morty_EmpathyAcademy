function showCharacters() {
    let query = "https://rickandmortyapi.com/api/character?name=" + currentName + "&page=" + currentPage +
        "&gender=" + currentGender + "&status=" + currentStatus
    fetch(query)
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
    currentGender = "";
    currentStatus = "";
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
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight - 300) {
            nextPage();
            let topBtn = document.getElementById("topBtn");
            topBtn.style.display = "block";
        }

        if (document.documentElement.scrollTop <= 50) {
            let topBtn = document.getElementById("topBtn");
            topBtn.style.display = "none";
        }
    };

    document.getElementById("aside-button").addEventListener("click", function () {
        clearFilters();
    })

    assignFilters();
})
function topFunction() {
    let topBtn = document.getElementById("topBtn");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    topBtn.style.display = "none";
}
function assignFilters() {
    document.getElementById("radioAlive").onclick = function () { updateFilters(); };
    document.getElementById("radioDead").onclick = function () { updateFilters(); };
    document.getElementById("radioMale").onclick = function () { updateFilters(); };
    document.getElementById("radioFemale").onclick = function () { updateFilters(); };
    document.getElementById("radioAliveMob").onclick = function () { updateFilters(); };
    document.getElementById("radioDeadMob").onclick = function () { updateFilters(); };
    document.getElementById("radioMaleMob").onclick = function () { updateFilters(); };
    document.getElementById("radioFemaleMob").onclick = function () { updateFilters(); };
}

function updateFilters() {
    currentPage = 1;
    document.getElementById("characters").innerHTML = "";

    if (document.getElementById("radioAlive").checked || document.getElementById("radioAliveMob").checked) {
        currentStatus = "alive";
    } else if (document.getElementById("radioDead").checked || document.getElementById("radioDeadMob").checked) {
        currentStatus = "dead";
    }

    if (document.getElementById("radioMale").checked || document.getElementById("radioMaleMob").checked) {
        currentGender = "male";
    } else if (document.getElementById("radioFemale").checked || document.getElementById("radioFemaleMob").checked) {
        currentGender = "female";
    }

    showCharacters();
}


let currentPage = 1;
let currentName = "";
let currentGender = "";
let currentStatus = "";

showCharacters();
