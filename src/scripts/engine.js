
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
    actions: {
        button: document.getElementById("next-duel"),

    },
}

const playerSides = {
    player1: "player-field-card",
    computer: "computer-field-card",
}

const patjImages = ".src/assets/icons/";

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

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCards = await getRandomCardId();
        const cardImage = await function createCardImage(randomIdCards, fieldSide);


        document.getElementById(fieldSide).appendChild(cardImage)
    }
}


function init() {
    drawCards(5, playerSides.player1)
    drawCards(5, playerSides.computer)
}


init()