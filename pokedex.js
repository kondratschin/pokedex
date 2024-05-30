
let pokemonData = [];
let loadAmount = 20;
let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=`${loadAmount}`&offset=10";


async function loadDataMon() {
    let MON_URL = "https://pokeapi.co/api/v2/pokemon/11/";
    let response = await fetch(MON_URL);
    let responseToJson = await response.json();
    let monPic = responseToJson.sprites.other.home.front_default;
    let monTyp1 = responseToJson.types[0].type.name;
    let monName = responseToJson.species.name;
    let monNo = responseToJson.order;
    console.log(responseToJson);
};


async function fillCards() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let index = 1; index <= loadAmount; index++) {
        let MON_URL = `https://pokeapi.co/api/v2/pokemon/${index}/`;
        let response = await fetch(MON_URL);
        let pokemon = await response.json();
        let monPic = pokemon.sprites.other.home.front_default;
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

        // Create the card HTML using the external function
        let card = createCard(index, monNo, monName, monPic, monTypeOne, monTypeTwo);

        // Append the card to the content
        content.innerHTML += card;
    }
}

