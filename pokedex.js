const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=10";


async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson.results);
    return responseToJson.results.length;

};

let MON_URL = "https://pokeapi.co/api/v2/pokemon/4/";

async function loadDataMon() {
    let response = await fetch(MON_URL);
    let responseToJson = await response.json();
    let monPic = responseToJson.sprites.other.home.front_default;
    let monTyp1 = responseToJson.types[0].type.name;
    let monTyp2 = responseToJson.types[1].type.name;
    let monName = responseToJson.species.name;
    let monNo = responseToJson.order;
    console.log(responseToJson);
    console.log(monPic);
    console.log(monTyp1);
    console.log(monTyp2);
    console.log(monName);
    console.log(monNo);
};


async function fillCard() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    let monAmount = await loadData();

    for (let index = 1; index <= monAmount; index++) {
        let MON_URL = `https://pokeapi.co/api/v2/pokemon/${index}/`;
        let response = await fetch(MON_URL);
        let pokemon = await response.json();
        let monPic = pokemon.sprites.other.home.front_default;
        let monName = pokemon.species.name;
        let monTypeOne = pokemon.types[0].type.name;
        let monTypeTwo = pokemon.types[1] ? pokemon.types[1].type.name : null; // Check for second type
        let monNo = pokemon.id;
        monName = monName.charAt(0).toUpperCase() + monName.slice(1);

        let card = `
        <div class="card">
            <div class="card-header">
                <div id="card-no-${index}" class="left-text">${monNo}</div>
                <div id="mo-name-${index}" class="centered-text">${monName}</div>
            </div>
            <div class="card-image" style="background-image: url('${monPic}');"></div>
            <div class="card-icons">
                <div class="types" id="type-one" style="background-image: url('img/${monTypeOne}.svg');"></div>
                ${monTypeTwo ? `<div class="types" id="type-two" style="background-image: url('img/${monTypeTwo}.svg');"></div>` : ''}
            </div>
        </div>
        `;
        content.innerHTML += card;
    }
}

