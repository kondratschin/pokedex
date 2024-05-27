function createCard(index, monNo, monName, monPic, monTypeOne, monTypeTwo) {
    let card = `
    <div class="card">
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
