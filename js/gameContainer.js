

//game conatiner runs the game loop, contains the instance of the actual game

class gameContainer {

	constructor() {
		this.running = false;
		this.gameActual = new board();

		this.run();
	}

	run() {

		console.log(this.gameActual.boardActual);
		while(this.running) {
			console.log("runnin");
			this.input();
			this.update();
			this.render();
		}
		this.render();
	}

	input() {

	}

	update() {

	}

	render() {
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
}

let startIt = new gameContainer();