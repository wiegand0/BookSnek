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

		//pick random letter in ASCII representation
			//(65-90 is capital letter range)
		let newTile = Math.random() * (90 - 65) + 65;

		//when the tile picked is occupied by player, or is non-empty, pick again
		while(boardActual[newTile].wormed && boardActual[newTile].char != "")
			newTile = Math.random() * (90 - 65) + 65;

		//when tile is selected, fill it
		boardActual[newTile].generate();

		//if they player has eaten a letter, add their score
		//if they ate themselves, game over
		if(player.eating)
			score += player.score;
		else if(player.collide)
			gameOver = true;

	}

}