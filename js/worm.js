//worm is the player controlled entity that allows player to interact with game

function worm() {

		//how to instantiate its place on the board without pointers?
		//pass the whole board in?
	var wormActual = [];

	wormActual.push(new tile());
	wormActual.push(new tile());

	var score = 0;
	var wormBel = new belly();
	var eating = false;
	var orientation = 2;
	var collided = false;
	var location = boardSize/2;


	this.eat = function() {
		//check the tile to see if there's any content to eat 
	}

	this.move = function(boardCurrent) {
		//if going down add board width, opposite for going up
		//
		switch(orientation) {
			case 0:
				if(location >= boardWidth)
					location -= boardWidth;
				break;
			case 1:
				if(location < boardSize-1)
					location += boardWidth;
				break;
			case 2:
				if(location%boardWidth != 0)
					location--;
				break;
			case 4:
				if(location%boardWidth != boardWidth-1)
					location++;
				break;
		}

		//move head
		wormAcutal[wormActual.length].update(true,false,false);

		//if player is not eating, tail moves
		if(!eating) {
			//remove tail
			wormActual[0].update(false,false,false);
			wormActual.shift();

			//move tail
			wormActual[0].update(true,false,true);
		}

		//add new head
		wormActual.push(boardCurrent[location]);

		//update head
		wormActual[wormActual.length-1].update(true,true,false);

	}

	this.update = function() {
		//
	}

	this.updateBoardPos = function(boardCurrent) {
		//update the player on the board, pass back new board
	}

}