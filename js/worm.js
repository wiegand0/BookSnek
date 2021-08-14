//worm is the player controlled entity that allows player to interact with game

var worm = (function() {
	//how to instantiate its place on the board without pointers?
		//pass the whole board in?
	var wormActual = [];

	wormActual.push(new tile());
	wormActual.push(new tile());

	wormActual[0].setLocation(15);
	wormActual[1].setLocation(16);
	wormActual[0].update(true, false, true);
	wormActual[1].update(true, true, false);

	var score = 0;
	var wormBel = new belly();
	var eating = false;
	var orientation = 2;
	var collided = false;
	var location = 16;

	function eat(boardCurrent) {
		//check the tile to see if there's any content to eat 
		return boardCurrent;
	}

	function move(boardCurrent) {
		//if going down add board width, opposite for going up
		//0 is up, 1 is down, 2 is left, 3 is right
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
			case 3:
				if(location%boardWidth != boardWidth-1)
					location++;
				break;
		}

		//move head

		console.log(wormActual.length);
		wormActual[wormActual.length-1].update(true,false,false);

		//if player is not eating, tail moves
		if(!eating) {
			//remove tail
			wormActual[0].update(false,false,false);
			
			//update on the board
			boardCurrent[wormActual[0].getLocation()].update(false,false,false);
			wormActual.shift();

			//move tail
			wormActual[0].update(true,false,true);
		}

		//add new head
		wormActual.push(boardCurrent[location]);

		//place head on board
		boardCurrent[location].update(true,true,false);

		//update head
		wormActual[wormActual.length-1].update(true,true,false);

		return boardCurrent;

	}

	function update(boardCurrent, boardWidth, boardHeight) {
		//move the worm, update the tiles on the board

		let newBoard = move(boardCurrent, boardWidth, boardHeight);
		//eat the tile, update board
		newBoard = eat(newBoard);
		return newBoard;
	}

	function updateBoardPos(boardCurrent) {
		//update the player on the board, pass back new board
	}

	return {
		update
	}

})();