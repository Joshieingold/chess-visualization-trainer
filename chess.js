let selectedCell = null;
const PIECES = {
    White_King: "&#9812",
    White_Queen: "&#9813",
    White_Rook: "&#9814",
    White_Bishop: "&#9815",
    White_Knight: "&#9816",
    White_Pawn: "&#9817",
    Black_King: "&#9818",
    Black_Queen: "&#9819",
    Black_Rook: "&#9820",
    Black_Bishop: "&#9821",
    Black_Knight: "&#9822",
    Black_Pawn: "&#9823",
};

let FENLibrary = {
    KingsGambit: "r1bqkbnr/pppp1ppp/2n5/8/3PPp2/5N2/PPP3PP/RNBQKB1R",
    CaroKann: "rn1qkbnr/pp2pppp/8/3p1b2/3P4/5N2/PPP2PPP/RNBQKB1R",
    StartingPosition: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
};

window.onload = function () {
    document
        .querySelector("#newGameButton")
        .addEventListener("click", HandleNewGameClick);
    document.querySelector("#moveButton").addEventListener("click", movePiece);
    document.querySelector("#grid").addEventListener("click", handlePieceClick);
    newGame(FENLibrary.StartingPosition);
};

function speak(move) {
    const utterance = new SpeechSynthesisUtterance(move);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];
    speechSynthesis.speak(utterance);
}
function handlePieceClick(e) {
    if (!e.target || !e.target.classList.contains("cell")) return;

    if (selectedCell === null) {
        if (e.target.textContent.trim() === "") return;

        selectedCell = e.target;
        selectedCell.classList.add("selected-piece");
        return;
    }

    MovePieceByClick(selectedCell, e.target);

    selectedCell.classList.remove("selected-piece");
    selectedCell = null;
}

function MovePieceByClick(fromCell, toCell) {
    toCell.innerHTML = fromCell.innerHTML;
    fromCell.innerHTML = "";
}

function movePiece() {
    let fromPos = document.querySelector("#fromInput").value;
    let toPos = document.querySelector("#toInput").value;
    let tempPiece = getCellFromLabel(fromPos);
    speak(toPos);
    newPiece = getCellFromLabel(toPos).innerHTML = tempPiece.innerHTML;
    tempPiece.innerHTML = "";
}

function HandleNewGameClick() {
    let choice = document.querySelector("#FEN-choice").value;
    if (choice === "Custom") {
        let customFEN = document.querySelector("#custom-FEN").value;
        if (customFEN !== "") {
            newGame(customFEN);
        }
    } else {
        newGame(FENLibrary[choice]);
    }
}
function newGame(FEN) {
    let board = GenerateBoardFromFEN(FEN);
    PlacePiecesOnBoard(board);
}

function PlacePiecesOnBoard(board) {
    let allRows = document.querySelectorAll(".row");
    for (let r = 1; r < allRows.length; r++) {
        let boardR = r - 1;
        let allColumns = allRows[r].querySelectorAll(".cell");
        for (let c = 1; c < allColumns.length; c++) {
            let boardC = c - 1;
            allColumns[c].innerHTML = board[boardR][boardC];
        }
    }
}

function GenerateBoardFromFEN(FEN) {
    let splitFEN = FEN.split("/");
    let returnArray = [];
    for (let row = 0; row < splitFEN.length; row++) {
        let thisRow = [];
        for (let col = 0; col < splitFEN[row].length; col++) {
            let currentPiece = DeterminePiece(splitFEN[row][col]);
            if (currentPiece === "") {
                for (let i = 0; i < Number(splitFEN[row][col]); i++) {
                    thisRow.push("");
                }
            } else {
                thisRow.push(currentPiece);
            }
        }
        returnArray.push(thisRow);
    }
    return returnArray;
}
function DeterminePiece(pieceChar) {
    if (pieceChar === "k") {
        return PIECES.Black_King;
    } else if (pieceChar === "q") {
        return PIECES.Black_Queen;
    } else if (pieceChar === "r") {
        return PIECES.Black_Rook;
    } else if (pieceChar === "b") {
        return PIECES.Black_Bishop;
    } else if (pieceChar === "n") {
        return PIECES.Black_Knight;
    } else if (pieceChar === "p") {
        return PIECES.Black_Pawn;
    } else if (pieceChar === "Q") {
        return PIECES.White_Queen;
    } else if (pieceChar === "R") {
        return PIECES.White_Rook;
    } else if (pieceChar === "B") {
        return PIECES.White_Bishop;
    } else if (pieceChar === "N") {
        return PIECES.White_Knight;
    } else if (pieceChar === "P") {
        return PIECES.White_Pawn;
    } else if (pieceChar === "K") {
        return PIECES.White_King;
    } else {
        return "";
    }
}
function getCellFromLabel(label) {
    let colLabel = label[0];
    let rowLabel = label[1];
    let colPos = colLabelToPos(colLabel);
    let rowPos = rowLabelToPos(rowLabel);

    console.log(label, colPos, rowPos);

    let rows = document.querySelectorAll(".row");
    let row = rows[rowPos];
    let cells = row.querySelectorAll(".cell");
    let cell = cells[colPos];

    return cell;
}
function rowLabelToPos(label) {
    return 9 - Number(label);
}
function colLabelToPos(label) {
    return "ABCDEFGH".indexOf(label.toUpperCase()) + 1;
}
