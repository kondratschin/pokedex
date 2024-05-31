
let pokemonData = [];
let loadAmount = 20;
let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=`${loadAmount}`&offset=10";
let totalCount = [];
let allPokemon = [];


async function loadDataMon() {
    let MON_URL = "https://pokeapi.co/api/v2/pokemon/1/";
    let response = await fetch(MON_URL);
    let responseToJson = await response.json();
    // let monPic = responseToJson.sprites.other.home.front_default;
    // let monTyp1 = responseToJson.types[0].type.name;
    // let monName = responseToJson.species.name;
    // let monNo = responseToJson.order;
    // let count = responseToJson.results[0].name;
    console.log(responseToJson);
    // console.log(count);
};


async function fillCards() {
    let content = document.getElementById('content');
    let newNumber = loadAmount - 19;

    for (let index = newNumber - 1; index <= loadAmount - 1; index++) {
        let MON_URL = `https://pokeapi.co/api/v2/pokemon/${index + 1}/`;
        let response = await fetch(MON_URL);
        let pokemon = await response.json();
        let monPic = pokemon.sprites.other["official-artwork"].front_default;
        let monName = pokemon.species.name;
        let monTypeOne = pokemon.types[0].type.name;
        let monNo = pokemon.id;
        let monHgt = pokemon.height;
        let monWgt = pokemon.weight;
        let monAblOne = pokemon.abilities[0].ability.name;
        monName = monName.charAt(0).toUpperCase() + monName.slice(1);

        // Initialize monTypeTwo to null
        let monTypeTwo = null;
        // Check if the second type exists and assign its name to monTypeTwo
        if (pokemon.types[1]) {
            monTypeTwo = pokemon.types[1].type.name;
        }

        // Initialize monAblTwo to null
        let monAblTwo = null;
        // Check if the second ability exists and assign its name to monAblTwo
        if (pokemon.abilities[1]) {
            monAblTwo = pokemon.abilities[1].ability.name;
        }

        // Create the card HTML using the external function
        let card = createCard(index, monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo);

        // Append the card to the content
        content.innerHTML += card;

        // Save Pokémon data to global array
        pokemonData.push({
            monNo: monNo,
            monName: monName,
            monPic: monPic,
            monTypeOne: monTypeOne,
            monTypeTwo: monTypeTwo,
            monHgt: monHgt,
            monWgt: monWgt,
            monAblOne: monAblOne,
            monAblTwo: monAblTwo
        });
    }
}

function loadMore() {
    loadAmount += 20;
    fillCards();
}


async function loadFoundMon(number, index) {
    let content = document.getElementById('content');
    let MON_URL = `https://pokeapi.co/api/v2/pokemon/${number}/`;
    let response = await fetch(MON_URL);
    let pokemon = await response.json();
    let monPic = pokemon.sprites.other["official-artwork"].front_default;
    let monName = pokemon.species.name;
    let monTypeOne = pokemon.types[0].type.name;
    let monNo = pokemon.id;
    let monHgt = pokemon.height;
    let monWgt = pokemon.weight;
    let monAblOne = pokemon.abilities[0].ability.name;
    monName = monName.charAt(0).toUpperCase() + monName.slice(1);
    let monTypeTwo = null;
    if (pokemon.types[1]) {
        monTypeTwo = pokemon.types[1].type.name;
    }
    let monAblTwo = null;
    if (pokemon.abilities[1]) {
        monAblTwo = pokemon.abilities[1].ability.name;
    }
    pokemonData.push({
        monNo: monNo,
        monName: monName,
        monPic: monPic,
        monTypeOne: monTypeOne,
        monTypeTwo: monTypeTwo,
        monHgt: monHgt,
        monWgt: monWgt,
        monAblOne: monAblOne,
        monAblTwo: monAblTwo
    });

    let filteredCard = createCard(index, monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo);
    content.innerHTML += filteredCard;


}


async function loadTotalCount() {
    let MON_URL = "https://pokeapi.co/api/v2/pokemon/";
    let pokemon = await fetch(MON_URL);
    let pokemonToJson = await pokemon.json();
    totalCount = pokemonToJson.count;
    listAllNames();
}


function load() {
    let postsJSON = localStorage.getItem('posts');
    if (postsJSON !== null) {
        posts = JSON.parse(postsJSON);
    }
}


async function listAllNames() {
    const storageKey = 'pokemon_list';
    const MON_URL = "https://pokeapi.co/api/v2/pokemon";
    const limit = 20;

    // Check if the list exists in localStorage
    let pokemonList = localStorage.getItem(storageKey);
    if (pokemonList !== null && pokemonList !== "[]") {
        console.log("Loaded from local storage.");
        allPokemon = JSON.parse(pokemonList);
    } else {
        pokemonList = [];
        let offset = 0;

        // Fetch data in a loop until we have all Pokémon names
        while (offset < totalCount) {
            const responseTotal = await fetch(`${MON_URL}?offset=${offset}&limit=20`);
            const data = await responseTotal.json();
            for (let i = 0; i < data.results.length; i++) {
                const monNames = data.results[i].name;
                const monURL = data.results[i].url;
                const monID = monURL.match(/\/(\d+)\//)[1]; // Extract the number from the URL
                pokemonList.push({ monNames, monID });
            }
            offset += limit;
        }

        // Save to localStorage
        localStorage.setItem(storageKey, JSON.stringify(pokemonList));
        console.log("Fetched from API and saved locally.");
        allPokemon = pokemonList;
    }
    return allPokemon;
}


