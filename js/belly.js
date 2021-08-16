//belly is the mechanic attached to the player that adds depth to the classic snake game

var belly = (function() {
	
	var stomach = '';

	function update(addMe) {
		stomach += addMe;
		if(addMe != "")
			searchBelly();
	}

	function searchBelly() {

		//tempWord to be s
		let tempWord = stomach;

		//find all possible contiguous subsets of stomach
		for(let i = 0; i < tempWord.length; i++) {
			for(let j = i; j < tempWord.length; j++) {
				let newStr = "";
				for(let k = i; k <= j; k++) {
					newStr += tempWord[k];
				}
				//we only care about them if they are at least 2 letters long
				//lazy way out, consider reworking logic eliminating unecessary loops
				if(newStr.length >= 2)
					console.log(newStr);
			}
		}
	}

	function emptyWord(theWord) {
		let regex = /theWord/i;
		let newStomach = stomach.replace(regex, '');

		stomach = newStomach;
	}

	function getContent() {
		return stomach;
	}

	return {
		update, getContent
	}
});