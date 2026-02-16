let pgn;
let moves;
let moveCounter = -1;

window.onload = function () {
    window.addEventListener("keydown", DetermineKey);
    document
        .querySelector("#load-btn")
        .addEventListener("click", GetPGNFromHTML);
};

function DetermineKey(e) {
    if (e.key === "ArrowRight") {
        MoveForward();
    } else if (e.key === "ArrowLeft") {
        MoveBackward();
    }
}
function MoveForward() {
    if (moveCounter >= moves.length) {
        Speak("Starting Game Over");
        moveCounter = -1;
        return;
    }
    moveCounter++;
    Speak(TranslateMove(moves[moveCounter]));
}

function MoveBackward() {
    moveCounter--;
    if (moveCounter < 0) {
        moveCounter = 0;
    }
    Speak(TranslateMove(moves[moveCounter]));
}
function GetPGNFromHTML() {
    let fullPGN = document.querySelector("#pgn-input").value.trim();
    moves = GetMovesFromPGN(fullPGN);
    document.querySelector("#pgn-input").value = "";
    document.querySelector("#pgn-input").ariaPlaceholder = "Good Luck!";
    console.log("hello");
}
function GetMovesFromPGN(pgnString) {
    let bracketsIncluded = pgnString.split("\n");
    let cleanString = "";
    for (let j = 0; j < bracketsIncluded.length; j++) {
        if (bracketsIncluded[j].startsWith("[")) continue;
        cleanString += bracketsIncluded[j];
    }
    cleanString = cleanString.trim();
    let pgnArray = cleanString.split(" ");
    let returnArray = [];
    let counter = 0;
    for (let i = 0; i < pgnArray.length; i++) {
        if (counter === 0) {
            counter++;
            continue;
        } else if (counter === 2) {
            counter = 0;
        } else {
            counter++;
        }
        returnArray.push(pgnArray[i]);
    }
    return returnArray;
}
function Speak(move) {
    const utterance = new SpeechSynthesisUtterance(move);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];
    speechSynthesis.speak(utterance);
}
function TranslateMove(notation) {
    let newPhrase = "";
    let foundPiece = false;
    if (notation == "O-O") {
        return "Castles";
    } else if (notation == "O-O-O") {
        return "Long Castles";
    }
    for (let i = 0; i < notation.length; i++) {
        let letter = notation[i];
        if (letter == "K" && !foundPiece) {
            newPhrase += "king";
            foundPiece = true;
        } else if (letter == "Q" && !foundPiece) {
            newPhrase += "queen";
            foundPiece = true;
        } else if (letter == "B" && !foundPiece) {
            newPhrase += "bishop";
            foundPiece = true;
        } else if (letter == "N" && !foundPiece) {
            newPhrase += "Knight";
            foundPiece = true;
        } else if (letter == "R" && !foundPiece) {
            newPhrase += "rook";
            foundPiece = true;
        } else if (letter == "x") {
            newPhrase += "takes";
        } else if (letter == "#") {
            newPhrase += "Checkmate";
        } else if (letter == "+") {
            newPhrase += "Check";
        } else if (letter == "a") {
            newPhrase += "A";
        } else {
            newPhrase += letter;
        }
        newPhrase += " ";
    }
    return newPhrase;
}
