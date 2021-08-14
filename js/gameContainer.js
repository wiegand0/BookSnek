//game conatiner runs the game loop, contains the instance of the actual game
var gameContainer = (function () {
	var running = true;

	function update() {
		board.update();
	}

	function input() {

	}

	function render() {

		document.getElementById("gameContainer").innerHTML = "";

		for(const till of board.getBoard()) {
			const para = document.createElement("div");
			if(till.getWormed()) { 
				para.setAttribute("class","tileW");
			} else {
				para.setAttribute("class","tile");
			}
			const node = document.createTextNode(till.getContent());

			para.appendChild(node);

			const element = document.getElementById("gameContainer");
			element.appendChild(para)

			console.log("adding " + till.getContent());

		}
	}

	function run() {

		setInterval(console.log("does it even work"),1000);

		if(running) {
			setInterval(function () {console.log("runnin")},1000);
			setInterval(input,1);
			setInterval(update,1000);
			setInterval(render, 1000);
		}
	}

	return {
		run
	}
})();

gameContainer.run();