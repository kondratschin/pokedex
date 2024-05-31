let filteredList = [];

// Define the search function
async function search() {
    let searchField = document.getElementById("searchMon");
    if (searchField.value.length >= 3) {
        pokemonData = [];
        displayNone('loadMoreBtn');
        document.getElementById('content').innerHTML = ""; // Clear content if search query is at least 3 characters long
        await fetchSearchData(searchField);
        await displayFilteredList();
    }
    else if ((searchField.value.length == 0)) {
        document.getElementById("content").innerHTML = "";
        loadAmount = 20;
        pokemonData = [];
        fillCards();
        displayOn('loadMoreBtn');
    }
}

// Add event listener directly to the input field after the DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    let searchField = document.getElementById("searchMon");
    searchField.addEventListener("input", search);
});

async function fetchSearchData(searchField) {
    try {
        filteredList = allPokemon.filter(element => element.monNames.includes(searchField.value.toLowerCase()));
    } catch (error) {
        console.error("Error fetching search data:", error);
    }
}


async function displayFilteredList() {
    console.log("Filtered List:");
    console.log(filteredList);
    loadAmount = filteredList.length;
    for (let index = 0; index < filteredList.length; index++) {
        let monNo = filteredList[index].monID;
        await loadFoundMon(monNo, index);
    }

}