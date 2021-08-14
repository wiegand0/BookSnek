//tile is the basic object that makes up the game board environment

/*function tile() {
	
	var content = "";
	var wormed = false;
	var head = false;
	var tail = false;

	this.generate = function(contentGiven) {
		//if no content given, generate random capital letter
		//else assign given to content
		if(contentGiven == undefined) {
			let asciiVal = Math.random() * (90 - 65) + 65;
			content = String.fromCharCode(asciiVal);0
		} else
			content = contentGiven;
	}

	this.update = function(wormedGiven, headGiven, tailGiven) {
		wormed = wormedGiven;
		head = headGiven;
		tail = tailGiven;
	}
}*/

var tile = (function () {
	var content = "";
	var wormed = false;
	var head = false;
	var tail = false;

	function generate(contentGiven) {
		//if no content given, generate random capital letter
		//else assign given to content
		if(contentGiven == undefined) {
			let asciiVal = Math.random() * (90 - 65) + 65;
			content = String.fromCharCode(asciiVal);0
		} else
			content = contentGiven;
	}

	function update(wormedGiven, headGiven, tailGiven) {
		wormed = wormedGiven;
		head = headGiven;
		tail = tailGiven;
	}

	function getContent() {
		return content;
	}

	return {
		update, getContent
  	}

});