function createCard(index, { monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo }) {
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

    if (monTypeTwo) {
        card += `
            <div class="types" id="type-two" style="background-image: url('img/${monTypeTwo}.svg');"></div>
        `;
    }

    card += `
        </div>
    </div>
    `;

    return card;
}

function loadDetail(index, monNo, monName, monPic, monTypeOne, monTypeTwo, monHgt, monWgt, monAblOne, monAblTwo) {
    let detailContent = document.getElementById('detail-popup');
    detailContent.classList.remove('d-none');
    document.getElementsByTagName("body")[0].classList.add('no-scroll');
    closeDetailCard();
    let typeTwoDetail = '';
    let typeDisplay = monTypeOne;
    if (monTypeTwo && monTypeTwo !== 'null') {
        typeTwoDetail = `<div class="type-detail"><span class="type-flag ${monTypeTwo}">${monTypeTwo}</span></div>`;
        typeDisplay += ` / ${monTypeTwo}`;
    }

    let formattedHeight = (parseFloat(monHgt) / 10);
    let formattedWeight = (parseFloat(monWgt) / 10);

    let abilitiesDisplay = monAblOne;

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