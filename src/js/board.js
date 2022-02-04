//board class contains all the contents of the game, player, score, environment etc.

//global board variables
const boardWidth = 25, boardHeight = 25, boardSize = boardWidth * boardHeight;

//can't access global variable inside module??
var board = (function() {

	//game state
	var gameOver = false;

	//tile array representation of board
	var boardActual = [];
	//the player
	var player = worm;

	function initialize() {	

		//Array(boardSize).fill(new tile()) doesn't work??;
		//initialize tile locations
		for(let i = 0; i < boardSize; i++) {
			boardActual.push(new tile());
			boardActual[i].setLocation(i);
		}

		//boardActual = player.update(boardActual, boardWidth, boardHeight);
	}

	function reset() {
		worm.destruct();
		boardActual = [];
	}

	function pickTile() {
		//choose a random tile
		let tileChosen = Math.floor(Math.random() * boardSize);
		//when the tile picked is occupied by player, or is non-empty, pick again

		let tries = 0;
		while(boardActual[tileChosen].getContent() != "" || boardActual[tileChosen].getWormed()) {
			tileChosen = Math.floor(Math.random() * boardSize);
			//arbitrary break point to stop inifinite loop
			if(tries>50)
				break;
			tries++;
		}

		//when tile is selected, fill it, if no tile is selected within 50 tries
		//do nothing
		if(tries<50)
			boardActual[tileChosen].generate();
	}

	function update() {

		//clear updates
		boardUpdates = [];

		//pick a tile, fill it
		pickTile();

		//update the player on the board
		boardActual = player.update(boardActual,boardWidth,boardHeight);

		//if they player eats themselves it's game over
		if(player.collide)
			gameOver = true;
	}

	function getBoard() {
		return boardActual;
	}

	function init() {
		boardActual = player.init(boardActual);
	}

	function keyDown(e) {
		player.changeDirection(e);
	}

	function getPlayer() {
		return player;
	}

	return {
		getBoard, update, init, keyDown, getPlayer, reset, initialize
	}
})();