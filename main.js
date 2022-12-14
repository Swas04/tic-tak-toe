//singlpayer
var tictacboard;
let human ;
let bot ;

const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
const cells = document.querySelectorAll('.cell');


function scrolling(){
	window.scrollTo(0,500);
	 }

function scrollingup(){
		window.scrollTo(0,-100);
		 }

function selectO(){
	human = "O";
	bot = "X";
	scrolling();
	singleStart();
	alert("U can start playing the game as O");
}

function selectX(){
	human = "X";
	bot = "O";
	scrolling();
	singleStart();
	alert("U can start playing the game as X");
}
function refresh(){
	location.reload();
	scrollingup();
	alert('Redirecting to the menu');
}

function retry(){
	singleStart();
	scrollingup();
	alert('Redirecting to the menu');
}

function singleStart() {
startSingle();
function startSingle() {
	document.querySelector(".endgame").style.display = "none";
	tictacboard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof tictacboard[square.target.id] == 'number') {
		turn(square.target.id, human)
		if (!checkTie()) turn(bestSpot(), bot);
	}
}

function turn(squareId, player) {
	tictacboard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(tictacboard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == human ? "#00F5B8" : "#00F5B8";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == human ? "You win :)" : "You lose :(");
	statusDisplay.innerHTML = drawMessage();
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return tictacboard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(tictacboard, bot).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "#00F5B8";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game :|")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if(checkWin(newBoard, human)){
		return { score: -10};
	}
	else if (checkWin(newBoard, bot)){
	    return{score: 10};
	}
	else if (availSpots.length === 0){
	    return{score: 0};
	}
	var moves =[];
	for (var i=0; i<availSpots.length; i++) {
		var move ={};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == bot) {
			var result = minimax(newBoard, human);
			move.score = result.score;
		}
		else {
			var result = minimax(newBoard, bot);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;
        
		moves.push(move);

	}

	var bestMove;
	if(player === bot) {
		var bestScore = -10000;
		for(var i=0; i<moves.length; i++){
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	else{
		var bestScore = 10000;
		for(var i=0; i<moves.length; i++){
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
}

//Multipayer
const statusDisplay = document.querySelector('.game--status');
const statusDisplay1 = document.querySelector('.game--status1');
const winDisplay = document.querySelector('.game--count');
const winDisplay1 = document.querySelector('.game--count1');
let gameActive = true;
let currentPlayer;
var previousPlayer;
var win=0;

const winningMessage = () => `${currentPlayer} has won :)`;
const displayMessage = () => `${currentPlayer}: ${win}`;
const displayMessage2 = () => `${previousPlayer}: ${win-1}`;
const displayMessaget = () => `${previousPlayer}: ${win}`;
const currentPlayerTurn = () => `${currentPlayer} vro khel le`;

function scrolling(){
	window.scrollTo(0,600);
	 }

function scrollingup(){
		window.scrollTo(0,-100);
		 }

function selectmO(){
	currentPlayer = "O";
	previousPlayer = "X";
	scrolling();
	alert("U can start playing the game as O");
	multiStart() ;
}

function selectmX(){
	currentPlayer = "X";
	previousPlayer = "O"
	scrolling();
	alert("U can start playing the game as X");
    multiStart() ;
}


let gameState = ["", "", "", "", "", "", "", "", ""];


const winChances = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function multiStart() {
	statusDisplay.innerHTML = currentPlayerTurn();
function multiCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function declareWinnermulti(who) {
	document.querySelector(".endgamemulti").style.display = "block";
	document.querySelector(".endgamemulti .text").innerText = who;
}

function multiPlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
	previousPlayer = previousPlayer === "X" ? "O" : "X";
	statusDisplay.innerHTML = currentPlayerTurn();
}


function multiResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winChances[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        win ++;
        declareWinnermulti(winningMessage());
		statusDisplay.innerHTML = displayMessage();
		statusDisplay1.innerHTML = displayMessage2();
		statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        declareWinnermulti("Tie Game :|");
		statusDisplay.innerHTML = displayMessage();
		statusDisplay1.innerHTML = displayMessaget();
		statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    multiPlayerChange();
}

function multiCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    multiCellPlayed(clickedCell, clickedCellIndex);
    multiResultValidation();
}

function multiRestartGame() {
    gameActive = true;
	currentPlayer;
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', multiCellClick));
document.querySelector('.game--restart').addEventListener('click', multiRestartGame);


}












