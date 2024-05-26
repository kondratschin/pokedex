const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";


async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson.results.length);
    return responseToJson.results.length;
};

let MON_URL = "https://pokeapi.co/api/v2/pokemon/1/";

async function loadDataMon() {
    let response = await fetch(MON_URL);
    let responseToJson = await response.json();
    let monPic = responseToJson.sprites.other.home.front_default;
    let monTyp = responseToJson.types;
    let monName = responseToJson.species.name;
    let monNo = responseToJson.order;
    console.log(responseToJson);
    console.log(monPic);
    console.log(monTyp);
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
        let data = await response.json();
        let monPic = data.sprites.other.home.front_default;
        let monName = data.species.name;
        let monNo = data.id;

        let card = `
        <div class="card">
            <div class="card-header">
                <div id="card-no-${index}" class="left-text">${monNo}</div>
                <div id="mo-name-${index}" class="centered-text">${monName}</div>
            </div>
            <div class="card-image" style="background-image: url('${monPic}');"></div>
            <div class="card-icons">
                <img src="https://via.placeholder.com/30" alt="Icon 1">
                <img src="https://via.placeholder.com/30" alt="Icon 2">
                <img src="https://via.placeholder.com/30" alt="Icon 3">
            </div>
        </div>
        `;
        content.innerHTML += card;
    }
}

// Call fillCard function to display the Pokémon data on the card
fillCard();