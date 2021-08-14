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
	var boardActual = [];

	//didn't work?? = Array(boardSize).fill(new tile());
	//initialize tile locations
	for(let i = 0; i < boardSize; i++) {
		boardActual.push(new tile());
		boardActual[i].setLocation(i);
	}

	//the player
	var player = worm;

	boardActual = player.update(boardActual, boardWidth, boardHeight);

	function update() {
		player.update(boardActual,boardWidth,boardHeight);

		/////CONSIDER MOVING CHARACTER GENERATION OF NON-OCCUPIED TILE LOGIC TO TILE CLASS/////
		//pick random letter in ASCII, convert it to character
			//(65-90 is capital letter range)
		let newTileContent = String.fromCharCode(Math.random() * (90 - 65) + 65);


		console.log("I'm updatin...");
		console.log(boardActual);
		//choose a random tile
		let tileChosen = Math.floor(Math.random() * boardSize);
		console.log("At: " + tileChosen);
		//when the tile picked is occupied by player, or is non-empty, pick again
		while(boardActual[tileChosen].getContent() != "" || boardActual[tileChosen].getWormed()) {
			console.log("reChose: " + tileChosen);
			tileChosen = Math.floor(Math.random() * boardSize);
		}
		//when tile is selected, fill it
		boardActual[tileChosen].setContent(newTileContent);
		/////END OF CONTENT TO BE MOVED/////

		boardActual = player.update(boardActual);

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