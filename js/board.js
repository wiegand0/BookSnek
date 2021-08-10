//board class contains all the contents of the game, player, score, environment etc.

const boardWidth = 25, boardHeight = 10, boardSize = boardWidth * boardHeight;

class board {
	
	constructor() {
		this.boardHeight = boardHeight;
		this.boardWidth = boardWidth;
		this.boardSize = boardSize;
	//actual score representation
		this.score = 0;
	//game state
		this.gameOver = false;
	//tile array representation of board
		this.boardActual = Array(tile).fill(boardSize);
	//the player
		this.player = worm;
	}

	update() {
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


		//if they player has eaten a letter, add their score
		//if they ate themselves, game over
		if(player.eating)
			score += player.score;
		else if(player.collide)
			gameOver = true;

	}

}