

//game conatiner runs the game loop, contains the instance of the actual game

/*
var gameContainer = (function {

	var running = false;
	var gameActual = new board();

	this.run = function() {

		console.log(gameActual.boardActual);
		while(running) {
			console.log("runnin");
			input();
			update();
			render();
		}
		this.render();
	}

	this.input = function() {

	}

	this.update = function() {

	}

	this.render = function() {
		for(const till in this.gameActual.boardActual) {

			const para = document.createElement("div");
			para.setAttribute("class","tile")
			const node = document.createTextNode(this.gameActual.boardActual[till].content);

			para.appendChild(node);

			const element = document.getElementById("gameContainer");
			element.appendChild(para)

			console.log("adding " + this.gameActual.boardActual[till].content);

		}
	}
}*/

var gameContainer = (function () {
	var running = false;

	function update() {

	}

	function input() {

	}

	function render() {
		for(const till of board.getBoard()) {

			const para = document.createElement("div");
			para.setAttribute("class","tile")
			const node = document.createTextNode(till.getContent());

			para.appendChild(node);

			const element = document.getElementById("gameContainer");
			element.appendChild(para)

			console.log("adding " + till.getContent());

		}
	}

	function run() {

		while(running) {
			console.log("runnin");
			input();
			update();
			render();
		}

		render();
	}

	return {
		run
	}
})();

gameContainer.run();