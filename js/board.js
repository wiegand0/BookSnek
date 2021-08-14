//board class contains all the contents of the game, player, score, environment etc.

const boardWidth = 25, boardHeight = 20, boardSize = boardWidth * boardHeight;

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
	var boardActual = Array(boardSize).fill(new tile());

	console.log("Made array of size: " + boardActual.length + " from: " + boardSize);
	//the player
	var player = worm;

	function update() {
		player.update(/*when key is pressed send event*/);

		/////CONSIDER MOVING CHARACTER GENERATION OF NON-OCCUPIED TILE LOGIC TO TILE CLASS/////
		//pick random letter in ASCII, convert it to character
			//(65-90 is capital letter range)
		let newTileContent = String.fromCharCode(Math.random() * (90 - 65) + 65);

		//choose a random tile
		let tileChosen = Math.random() * boardSize;
		//when the tile picked is occupied by player, or is non-empty, pick again
		while(boardActual[tileChosen].content != "" || boardActual[tileChosen].wormed)
			tileChosen = Math.random() * boardsize;
		//when tile is selected, fill it
		boardActual[newTile].generate(newTileContent);
		/////END OF CONTENT TO BE MOVED/////

		player.updateBoardPos(boardActual);

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

	return {
		getBoard, update
	}
})();