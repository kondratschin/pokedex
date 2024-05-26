const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";

async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
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



// function fillCard() {
//     let monPic = 
// }

// "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",