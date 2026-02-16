let pgn =
    " 1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Bc4 e5 6. Nf3 Bb4 7. O-O Bxc3 8. bxc3 Nf6 9. Qe2 d6 10. Rd1 O-O 11. Ba3 Re8 12. Rxd6 Qc7 13. Ng5 Be6 14. Nxe6 fxe6 15. Bxe6+ Kh8 16. Rad1 Rad8 17. Rxd8 Rxd8 18. Rxd8+ Qxd8 19. h3 h6 20. Qb5 Qd1+ 21. Kh2 Nxe4 22. Qxb7 Nxf2 23. Qxc6 Qh1+ 24. Kg3 Qe1 25. Qe8+ Kh7 26. Bf5+ g6 27. Qxg6+ Kh8 28. Qf6+ Kg8 29. Qf8# 1-0 ";
let moves = GetMovesFromPGN(pgn.trim());
let moveCounter = -1;
let randInt = Math.floor(Math.random() * 10);

function GetMovesFromPGN(pgnString) {
    let pgnArray = pgnString.split(" ");
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

window.onload = function () {
    console.log(moves);
    window.addEventListener("keydown", (event) => {
        const keyName = event.key;
        if (keyName === "ArrowLeft") {
            moveCounter--;
            if (moveCounter < 0) {
                moveCounter = 0;
            }
            Speak(TranslateMove(moves[moveCounter]));
        } else if (keyName === "ArrowRight") {
            if (moveCounter >= moves.length) {
                Speak("Starting Game Over");
                moveCounter = 0;
            }
            moveCounter++;
            Speak(TranslateMove(moves[moveCounter]));
        }
    });
};
