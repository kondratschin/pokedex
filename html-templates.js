function createCard(index, monNo, monName, monPic, monTypeOne, monTypeTwo) {
    let card = `
    <div onclick="loadDetail('${monNo}', '${monName}', '${monPic}', '${monTypeOne}', '${monTypeTwo}')" class="card">
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

function loadDetail(monNo, monName, monPic, monTypeOne, monTypeTwo) {
    let detailContent = document.getElementById('detail-popup');
    detailContent.innerHTML =
    detailContent.innerHTML =
`
<div class="detail-wrapper">
<div class="card-detail">

    <div class="headline-detail ${monTypeOne}">
        <div class="number-detail">#${monNo}</div>
        <span class="name-detail">${monName}</span>
        <img src="./img/xmark.svg" alt="" class="close-btn-detail">
    </div>
    <div class="row-detail ${monTypeOne}_bg">
        <div class="type-detail"><span class="type-flag ${monTypeOne}">${monTypeOne}</span></div>
        <div class="type-detail"><span class="type-flag ${monTypeTwo}">${monTypeTwo}</span></div>
    </div>
    <div class="arrows-detail ${monTypeOne}_bg">
        <div class="arrow-detail-left"></div>
        <div class="image-detail  style="background-image: url('${monPic}')"></div>
        <div class="arrow-detail"></div>
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
                <td>Grass/Poison</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>0.7 m</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>6.9 kg</td>
            </tr>
            <tr>
                <td>Abilities</td>
                <td>Overgrow, Chlorophyll</td>
            </tr>
        </tbody>
    </table>
</div>
</div>
`;
}