//game conatiner runs the game loop, contains the instance of the actual game
console.log("gameContainer");
var gameContainer = (function () {

	function update() {
		board.update();
	}

	function input() {

	}

	function render() {

		document.getElementById("gameContainer").innerHTML = "";
		document.getElementById("belly").innerHTML = "";


		for(const till of board.getBoard()) {
			const para = document.createElement("div");
			if(till.getWormed()) { 
				if(till.getHead()) {
					para.setAttribute("id","tileHead");
					para.setAttribute("class","rotate" + till.getOrient());
				} else if(till.getTail()) {
					para.setAttribute("id","tileTail");
					para.setAttribute("class","rotate" + till.getOrient());
				} else {
					para.setAttribute("class","tileBody o" + till.getOrient() + " rotate" + till.getOrient()%4);
				}
			} else {
				para.setAttribute("class","tile");
			}
			const node = document.createTextNode(till.getContent())
			const element = document.getElementById("gameContainer");;

			para.appendChild(node);
			element.appendChild(para)

		}


		let bellyString = board.getPlayer().getBelly().getContent();

		for(let i = 0; i < 15; i++) {
			const paraBelly = document.createElement("div");
			paraBelly.setAttribute("class","tileBelly");


			let nodeBelly = document.createTextNode("");

			if(bellyString[i])
				nodeBelly = document.createTextNode(bellyString[i]);
	
			paraBelly.appendChild(nodeBelly);

			const elementBelly = document.getElementById("belly");
			elementBelly.appendChild(paraBelly);
		}

	}

	function init() {
		//board.init();
		setInterval(run, 500);
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
