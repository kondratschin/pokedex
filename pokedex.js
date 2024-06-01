let pokemonData = [];
let loadAmount = 20;
let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=`${loadAmount}`&offset=10";
let totalCount = [];
let allPokemon = [];


async function fillCards() {
    let content = document.getElementById('content');
    let newNumber = loadAmount - 19;

    for (let index = newNumber - 1; index < loadAmount; index++) {
        let pokemon = await fetchPokemon(index + 1);
        let card = createCard(index, pokemon);

        content.innerHTML += card;

        pokemonData.push(pokemon);
    }
}

async function fetchPokemon(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();

    let monTypeTwo = null;
    if (data.types[1]) {
        monTypeTwo = data.types[1].type.name;
    }

    let monAblTwo = null;
    if (data.abilities[1]) {
        monAblTwo = data.abilities[1].ability.name;
    }

    return {
        monNo: data.id,
        monName: capitalize(data.species.name),
        monPic: data.sprites.other["official-artwork"].front_default,
        monTypeOne: data.types[0].type.name,
        monTypeTwo: monTypeTwo,
        monHgt: data.height,
        monWgt: data.weight,
        monAblOne: data.abilities[0].ability.name,
        monAblTwo: monAblTwo
    };
}


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function loadMore() {
    loadAmount += 20;
    fillCards();
}


async function loadFoundMon(number, index) {
    let content = document.getElementById('content');
    let pokemon = await fetchPokemon(number);

    pokemonData.push(pokemon);

    let filteredCard = createCard(index, pokemon);
    content.innerHTML += filteredCard;
}


async function loadTotalCount() {
    let MON_URL = "https://pokeapi.co/api/v2/pokemon/";
    let pokemon = await fetch(MON_URL);
    let pokemonToJson = await pokemon.json();
    totalCount = pokemonToJson.count;
    listAllNames();
}


// to reduce api requests, I made this code. it saves the names, url and id and also the search function is using this its requested once and saved locally
async function listAllNames() {
    let storageKey = 'pokemon_list';
    let MON_URL = "https://pokeapi.co/api/v2/pokemon";
    let limit = 20;

    let pokemonList = localStorage.getItem(storageKey);
    if (pokemonList !== null && pokemonList !== "[]") {
        console.log("Loaded from local storage.");
        allPokemon = JSON.parse(pokemonList);
    } else {
        pokemonList = [];
        let offset = 0;

        while (offset < totalCount) {
            let responseTotal = await fetch(`${MON_URL}?offset=${offset}&limit=20`);
            let data = await responseTotal.json();
            for (let i = 0; i < data.results.length; i++) {
                let monNames = data.results[i].name;
                let monURL = data.results[i].url;
                let monID = monURL.match(/\/(\d+)\//)[1];
                pokemonList.push({ monNames, monID });
            }
            offset += limit;
        }

        localStorage.setItem(storageKey, JSON.stringify(pokemonList));
        console.log("Fetched from API and saved locally.");
        allPokemon = pokemonList;
    }
    return allPokemon;
}


function closeDetailCard() {
    let detailContainer = document.getElementById("detail-popup");
    detailContainer.addEventListener('click', (event) => {
        if (event.target === detailContainer) {
            displayNone('detail-popup');
        }
    });
}


function displayNone(id) {
    document.getElementById(id).classList.add('d-none');
    document.body.classList.remove('no-scroll');
}


function displayOn(id) {
    document.getElementById(id).classList.remove('d-none');
}


function loadMon(i) {
    let index;
    if (i === -1) {
        index = loadAmount - 1;
    } else if (i === loadAmount) {
        index = 0;
    } else {
        index = i;
    }

    let { monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo } = pokemonData[index];
    loadDetail(index, monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo);
}


function loadDetail(index, monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo) {
    let detailContent = document.getElementById('detail-popup');
    showDetailContent(detailContent);
    let typeTwoDetail = getTypeDetail(monTypeTwo);
    let typeDisplay = monTypeOne + (monTypeTwo && monTypeTwo !== 'null' ? ` / ${monTypeTwo}` : '');
    let formattedHeight = parseFloat(monHgt) / 10;
    let formattedWeight = parseFloat(monWgt) / 10;
    let abilitiesDisplay = generateAbilitiesDisplay(monAblOne, monAblTwo);

    detailContent.innerHTML = generateDetailHTML(index, monNo, monName, monPic, monTypeOne, typeTwoDetail, typeDisplay, formattedHeight, formattedWeight, abilitiesDisplay);
}

function showDetailContent(detailContent) {
    detailContent.classList.remove('d-none');
    document.getElementsByTagName("body")[0].classList.add('no-scroll');
    closeDetailCard();
}

function getTypeDetail(monTypeTwo) {
    let typeTwoDetail = '';
    if (monTypeTwo && monTypeTwo !== 'null') {
        typeTwoDetail = `<div class="type-detail"><span class="type-flag ${monTypeTwo}">${monTypeTwo}</span></div>`;
    }
    return typeTwoDetail;
}

function generateAbilitiesDisplay(monAblOne, monAblTwo) {
    let abilitiesDisplay = monAblOne;
    if (monAblTwo && monAblTwo !== 'null') {
        abilitiesDisplay += `, ${monAblTwo}`;
    }
    return abilitiesDisplay;
}