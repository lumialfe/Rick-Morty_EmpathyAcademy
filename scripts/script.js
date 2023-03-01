function showCharacters() {
    let query = "https://rickandmortyapi.com/api/character?name=" + currentName + "&page=" + currentPage +
        "&gender=" + currentGender + "&status=" + currentStatus
    fetch(query)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            for (let i = 0; i < json.results.length; i++) {
                document.getElementById("characters").innerHTML += getCharacterCard(json.results[i]);
            }
            currentPage++
        });
}

function getCharacterCard(character) {

    let img = "<img class='card-image' loading='lazy' src='" + character.image + "' alt='" + character.name + "'/>"
    let name = "<p class='card-name'>" + character.name + "</p>"
    let description = "<p class='card-text'>Gender: " + character.gender + "<br/>"
        + "Status: " + character.status + "</br>"
        + "</p>"


    let tooltip = "<p class='card-extradesc'>" + "Species: " + character.species + "<br/>"
        + "Origin: " + character.origin.name + "<br/>"
        + "</p>"
    return "<div class='main-card'>" + img + name + description + tooltip + "</div>"
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
    document.getElementById("nCols").value = 5;
    showCharacters();
}

const debounce = (func, delay) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let searchBar = document.getElementById("searchBar");
    searchBar.addEventListener('input', debounce(function () {
        searchName();
    }, 250));

    /**
     * Infinite Scrolling
     */
    window.onscroll = () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight - 300) {
            nextPage();
        }

        if (document.documentElement.scrollTop <= 50) {
            let topBtn = document.getElementById("topBtn");
            topBtn.style.display = "none";
        }

        if (document.documentElement.scrollTop >= 500) {
            let topBtn = document.getElementById("topBtn");
            topBtn.style.display = "block";
        }
    };

    document.getElementById("aside-button").addEventListener("click", function () {
        clearFilters();
    })

    document.getElementById("header-filter-button").onclick = () => {
        let currentVis = document.getElementById("body-mobile-filters").style.display;
        if (currentVis == "block") {
            document.getElementById("body-mobile-filters").style.display = "none";
        } else {
            document.getElementById("body-mobile-filters").style.display = "block";
        }
    }

    for (let i = 4; i < 9; i++) {
        document.getElementById("nCols").innerHTML += "<option value='" + i + "'>" + i + "</option>";
    }

    document.getElementById("nCols").onchange = () => {
        let val = (
            "repeat(" +
            String(document.getElementById("nCols").value)
            + ", minmax(50px, 1fr))");
        document.getElementById("characters").style.gridTemplateColumns = val;
    }

    document.getElementById("nCols").value = 5

    assignFilters();
})

function topFunction() {
    let topBtn = document.getElementById("topBtn");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    topBtn.style.display = "none";
}

function assignFilters() {

    let radios = document.getElementsByTagName('input');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].type == 'radio') {
            radios[i].onclick = function () {
                updateFilters();
            };
        }
    }
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
