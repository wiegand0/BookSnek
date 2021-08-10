//tile is the basic object that makes up the game board environment

class tile {
	
	constructor() {
		this.content = "";
		this.wormed = false;
		this.head = false;
		this.tail = false;
	}

	void generate(contentGiven) {
		//if no content given, generate random capital letter
		//else assign given to content
		if(contentGiven == undefined) {
			let asciiVal = Math.random() * (90 - 65) + 65;
			this.content = String.fromCharCode(asciiVal);0
		} else
			this.content = contentGiven;
	}

	update(wormedGiven, headGiven, tailGiven) {
		this.wormed = wormedGiven;
		this.head = headGiven;
		this.tail = tailGiven;
	}
}