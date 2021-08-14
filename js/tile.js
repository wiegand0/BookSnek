//tile is the basic object that makes up the game board environment
var tile = (function () {
	var content = "";
	var wormed = false;
	var head = false;
	var tail = false;

	//a way to keep track of where the tile is on the board
	var indexed;

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

	function getLocation() {
		return indexed;
	}

	function getWormed() {
		return wormed;
	}

	return {
		update, getContent, getLocation, getWormed, setLocation: function (newIndex) {indexed = newIndex;}, setContent: function(newContent) {content = newContent}
  	}

});