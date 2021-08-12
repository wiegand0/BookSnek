//worm is the player controlled entity that allows player to interact with game

class worm {

	constructor() {
		//how to instantiate its place on the board without pointers?
		//pass the whole board in?
		this.wormActual = [];

		this.wormActual.push(new tile());
		this.wormActual.push(new tile());

		this.score = 0;
		this.wormBel = new belly();
		this.eating = false;
		this.orientation = 2;
		this.collided = false;
		this.location = boardSize/2;
	}


	eat() {
		//check the tile to see if there's any content to eat 
	}

	move() {
		//
	}

	update() {
		//
	}

	updateBoardPos(board) {
		//update the player on the board, pass back new board
	}

}