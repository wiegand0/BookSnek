//worm is the player controlled entity that allows player to interact with game
console.log("worm");
var worm = (function() {
	//how to instantiate its place on the board without pointers?
		//pass the whole board in?
	var wormActual = [];

	wormActual.push(new tile());
	wormActual.push(new tile());
	wormActual.push(new tile());
	wormActual.push(new tile());
	wormActual.push(new tile());
	wormActual.push(new tile());
	wormActual.push(new tile());
	wormActual.push(new tile());

	wormActual[0].setLocation(0);
	wormActual[1].setLocation(25);
	wormActual[2].setLocation(26);
	wormActual[3].setLocation(1);
	wormActual[4].setLocation(2);
	wormActual[5].setLocation(27);
	wormActual[6].setLocation(28);
	wormActual[7].setLocation(3);
	wormActual[0].update(true, false, true);
	wormActual[1].update(true, false, false);
	wormActual[2].update(true, false, false);
	wormActual[3].update(true, false, false);
	wormActual[4].update(true, false, false);
	wormActual[5].update(true, false, false);
	wormActual[6].update(true, false, false);
	wormActual[7].update(true, true, false);

	var score = 0;
	var wormBel = new belly();
	var eating = false;
	var orientation = 3;
	var collided = false;
	var location = 3;

	function eat(boardCurrent) {
		//check the tile to see if there's any content to eat 
		return boardCurrent;
	}

	function move(boardCurrent) {
		//if going down add board width, opposite for going up
		//0 is up, 1 is down, 2 is left, 3 is right

		switch(orientation) {
			case 0:
				if(location >= boardWidth-1)
					location -= boardWidth;
				else
					//trigger game over
					return;
				break;
			case 1:
				if(location < boardSize-boardWidth)
					location += boardWidth;
				else
					//trigger game over
					return;
				break;
			case 2:
				if(location%boardWidth != 0)
					location--;
				else
					//trigger game over
					return boardCurrent;
				break;
			case 3:
				if(location%boardWidth != boardWidth-1)
					location++;
				else
					//trigger game over
					return;
				break;
		}

		//move head
		wormActual[wormActual.length-1].update(true,false,false);

		//add new head
		if(boardCurrent[location].getWormed()) {
			console.log("GAME OVVVVERRRRR")
			return;
		}

		wormActual.push(boardCurrent[location]);

		//place head on board
		boardCurrent[location].update(true,true,false);

		//update head
		wormActual[wormActual.length-1].update(true,true,false);

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

		return boardCurrent;

	}

	function update(boardCurrent, boardWidth, boardHeight) {
		//move the worm, update the tiles on the board

		let newBoard = move(boardCurrent, boardWidth, boardHeight);
		//eat the tile, update board
		newBoard = eat(newBoard);
		return newBoard;
	}

	function changeDirection(e) {

		let head = wormActual[wormActual.length-1].getLocation(), neck = wormActual[wormActual.length-2].getLocation();

		console.log("Changin " + head + " : " + neck);

		switch(e.key) {
			case "ArrowUp":
				if(neck != head - boardWidth)
					orientation = 0;
				break;
			case "ArrowDown":
				if(neck != head + boardWidth)
					orientation = 1;
				break;
			case "ArrowLeft":
				if(neck != --head)
					orientation = 2;
				break;
			case "ArrowRight":
				if(neck != ++head)
					orientation = 3;
				break;
		}
	}

	function init(boardCurrent) {
		let boardUpdated = boardCurrent;

		boardUpdated[wormActual[0].getLocation()].update(true,false,true);
		for(let i = 1; i < wormActual.size-1; i++) {
			boardUpdated[wormActual[i].getLocation()].update(true,false,false);
		}
		boardUpdated[wormActual[wormActual.length-1].getLocation()].update(true,true,false);
		return boardUpdated;
	}

	return {
		update, init, changeDirection
	}

})();