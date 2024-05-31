function createCard(index, monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo) {
    let card = `
    <div onclick="loadDetail('${index}', '${monNo}', '${monName}', '${monPic}', '${monTypeOne}', '${monTypeTwo}', '${monHgt}', '${monWgt}', '${monAblOne}', '${monAblTwo}')" class="card">
        <div class="card-header ${monTypeOne}">
            <div id="card-no-${index}" class="left-text">#${monNo}</div>
            <div id="mo-name-${index}" class="centered-text">${monName}</div>
        </div>
    
        <div class="card-image ${monTypeOne}_bg" style="background-image: url('${monPic}');"></div>
        <div class="card-icons ${monTypeOne}">
            <div class="types" id="type-one" style="background-image: url('img/${monTypeOne}.svg');"></div>
    `;

    // Add the second type if it exists
    if (monTypeTwo) {
        card += `
            <div class="types" id="type-two" style="background-image: url('img/${monTypeTwo}.svg');"></div>
        `;
    }

    // Close the card-icons and card divs
    card += `
        </div>
    </div>
    `;

    return card;
}

function loadDetail(index, monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo) {
    let detailContent = document.getElementById('detail-popup');
    detailContent.classList.remove('d-none');
    // Initialize type details and type display
    let typeTwoDetail = '';
    let typeDisplay = monTypeOne;

    // Check if monTypeTwo is not 'null' and update the details accordingly
    if (monTypeTwo && monTypeTwo !== 'null') {
        typeTwoDetail = `<div class="type-detail"><span class="type-flag ${monTypeTwo}">${monTypeTwo}</span></div>`;
        typeDisplay += ` / ${monTypeTwo}`;
    }

    // Convert height to centimeters and format weight to two decimal places
    let formattedHeight = (parseFloat(monHgt) / 10);
    let formattedWeight = (parseFloat(monWgt) / 10);

    // Initialize abilities display
    let abilitiesDisplay = monAblOne;

    // Check if monAblTwo is not 'null' and update the abilities display accordingly
    if (monAblTwo && monAblTwo !== 'null') {
        abilitiesDisplay += `, ${monAblTwo}`;
    }

    detailContent.innerHTML =
`
<div class="detail-wrapper">
<div class="card-detail">

    <div class="headline-detail ${monTypeOne}">
        <div class="number-detail">#${monNo}</div>
        <span class="name-detail">${monName}</span>
        <img onclick="displayNone('detail-popup')" src="./img/xmark.svg" alt="" class="close-btn-detail">
    </div>
    <div class="row-detail ${monTypeOne}_bg_detail">
        <div class="type-detail"><span class="type-flag ${monTypeOne}">${monTypeOne}</span></div>
        ${typeTwoDetail}
    </div>
    <div class="arrows-detail ${monTypeOne}_bg_detail">
        <div onclick="loadMon(${index - 1})" class="arrow-detail-left"></div>
        <div class="image-detail" style="background-image: url('${monPic}')"></div>
        <div onclick="loadMon(${index +++ 1})" class="arrow-detail"></div>
    </div>
</div>
<div class="stats ${monTypeOne}">
    <table>
        <thead>
            <tr>
                <th>About</th>
                <th>Base stats</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Type</td>
                <td>${typeDisplay}</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>${formattedHeight} m</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>${formattedWeight} kg</td>
            </tr>
            <tr>
                <td>Abilities</td>
                <td>${abilitiesDisplay}</td>
            </tr>
        </tbody>
    </table>
</div>
</div>
`;
}

function displayNone(id) {
    let detailContent = document.getElementById(`${id}`);
    detailContent.classList.add('d-none');
}


function displayOn(id) {
    let detailContent = document.getElementById(`${id}`);
    detailContent.classList.remove('d-none');
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

    let monNo = pokemonData[index].monNo;
    let monName = pokemonData[index].monName;
    let monPic = pokemonData[index].monPic;
    let monTypeOne = pokemonData[index].monTypeOne;
    let monTypeTwo = pokemonData[index].monTypeTwo;
    let monHgt = pokemonData[index].monHgt;
    let monWgt = pokemonData[index].monWgt;
    let monAblOne = pokemonData[index].monAblOne;
    let monAblTwo = pokemonData[index].monAblTwo;
    loadDetail(index, monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo);
}


