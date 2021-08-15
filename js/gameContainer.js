//game conatiner runs the game loop, contains the instance of the actual game
console.log("gameContainer");
var gameContainer = (function () {

	function update() {
		console.log("i ran");
		board.update();
	}

	function input() {

	}

	function render() {

		console.log("rendering");

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
		}

		document.getElementById("belly").innerHtml = board.getPlayer().getBelly().getContent();

		console.log("BELLY: " + board.getPlayer().getBelly().getContent());
	}

	function init() {
		//board.init();
		setInterval(run, 1000);
	}

	function run() {
		//let timeElapsed = currentTime - lastUpdate;
		update();
		render();
	}

	function arrowKey(e) {
		board.keyDown(e);
	}

	return {
		init, arrowKey
	}
})();

gameContainer.init();

//listener for player input
document.onkeydown = function (e) {gameContainer.arrowKey(e)};
