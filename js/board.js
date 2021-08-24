//board class contains all the contents of the game, player, score, environment etc.

const boardWidth = 25, boardHeight = 20, boardSize = boardWidth * boardHeight;
console.log("board");


//can't access global variable inside module??
var board = (function() {
	var boardHeight = 20;
	var boardWidth = 25;
	var boardSize = boardWidth * boardHeight;
	//actual score representation
	var score = 0;
	//game state
	var gameOver = false;
	//tile array representation of board
	var boardActual = [];

	//Array(boardSize).fill(new tile()) doesn't work??;
	//initialize tile locations
	for(let i = 0; i < boardSize; i++) {
		boardActual.push(new tile());
		boardActual[i].setLocation(i);
	}

	//the player
	var player = worm;

	boardActual = player.update(boardActual, boardWidth, boardHeight);

	function update() {

		//clear updates
		boardUpdates = [];

		/////CONSIDER MOVING CHARACTER GENERATION OF NON-OCCUPIED TILE LOGIC TO TILE CLASS/////
		//pick random letter in ASCII, convert it to character
			//(65-90 is capital letter range)
		let newTileContent = String.fromCharCode(Math.random() * (90 - 65) + 65);


		//choose a random tile
		let tileChosen = Math.floor(Math.random() * boardSize);
		//when the tile picked is occupied by player, or is non-empty, pick again
		//keep it from infinite looping
		let tries = 0;
		while(boardActual[tileChosen].getContent() != "" || boardActual[tileChosen].getWormed()) {
			tileChosen = Math.floor(Math.random() * boardSize);
			//arbitrary break point to stop inifinite loop
			if(tries>50)
				break;
			tries++;
		}
		//when tile is selected, fill it, if not because of break
		if(tries<50)
			boardActual[tileChosen].setContent(newTileContent);
		/////END OF CONTENT TO BE MOVED/////


		boardActual = player.update(boardActual,boardWidth,boardHeight);

		//if they player has eaten a letter, add their score
		//if they ate themselves, game over
		if(player.eating)
			score += player.score;
		else if(player.collide)
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
		getBoard, update, init, keyDown, getPlayer
	}
})();