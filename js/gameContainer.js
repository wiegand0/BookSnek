//game conatiner runs the game loop, contains the instance of the actual game
console.log("gameContainer");
var gameContainer = (function () {

	let runInterval = setInterval(run, 500);

	function update() {
		board.update();
	}

	function input() {

	}

	function render() {

		//board html element
		document.getElementById("gameContainer").innerHTML = "";
		//belly html element
		document.getElementById("belly").innerHTML = "";

		//generate the html for the game board
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

		//generate the belly tiles, currently preset to 12
		for(let i = 0; i < 12; i++) {
			const paraBelly = document.createElement("p");
			paraBelly.setAttribute("class","tileBelly");


			let nodeBelly = document.createTextNode("");

			if(bellyString[i])
				nodeBelly = document.createTextNode(bellyString[i]);
	
			paraBelly.appendChild(nodeBelly);

			const elementBelly = document.getElementById("belly");
			elementBelly.appendChild(paraBelly);
		}

	}

	function run() {
		//let timeElapsed = currentTime - lastUpdate;

		if(board.getPlayer().getCollided()) {
			clearInterval(runInterval);
			console.log("GAME OVVVVERRRRRR");
			return;
		}

		update();
		render();
	}

	function arrowKey(e) {
		board.keyDown(e);
	}

	return {
		arrowKey
	}
})();


//listener for player input
document.onkeydown = function (e) {gameContainer.arrowKey(e)};