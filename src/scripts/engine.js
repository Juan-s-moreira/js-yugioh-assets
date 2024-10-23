
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points")
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-cards"),
        computer: document.getElementById("computer-field-cards"),
    },
    playerSides: {
        player1: "player-cards",
        player1Box:  document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox:  document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),

    },
}



const patjImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${patjImages}dragon.png`,
        winof: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${patjImages}magician.png`,
        winof: [2],
        loseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissor",
        img: `${patjImages}exodia.png`,
        winof: [0],
        loseOf: [1],
    },
]

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}


async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(idCard)
        });

        cardImage.addEventListener("click", () => {
            setCardsFields(cardImage.getAttribute("data-id"));
        })
    }


    return cardImage;
}

async function setCardsFields(cardId) {

    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img
    state.fieldCards.computer.src = cardData[computerCardId].img

    let duelResults = await checkDuelResults(cardId, computerCardId)


    await updateScore();
    await drawButton(duelResults);

}

async function removeAllCardsImages() {
    let { computerBox, player1Box} = state.playerSides;
    let imgElements =computerBox.querySelectorAll("img")
    imgElements.forEach((img) => img.remove());

    cards = state.playerSides.player1Box;
     imgElements = player1Box.querySelectorAll("img")
    imgElements.forEach((img) => img.remove())
}


async function drawSelectCard(index) {
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
}


async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCards = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCards, fieldSide);


        document.getElementById(fieldSide).appendChild(cardImage)
    }
}


function init() {
    drawCards(5, playerSides.player1)
    drawCards(5, playerSides.computer)
}


init()