//belly is the mechanic attached to the player that adds depth to the classic snake game

class belly {
	stomach;
	//searchindex <-- for later implementation to eliminate repeat searches

	constructor() {
		this.stomach = '';
	}

	update(addMe) {
		stomach += addMe;
		searchBelly();
	}

	search_belly() {
		//let backIndex = 0; <-- implement alongside searchindex

		//tempWord to be s
		let tempWord = tempWord2 = stomach;

		//search through string, dropping characters at beginning
		for(var i = 0; i < tempWord.length - 2; i++) {
			tempWord2 = tempWord
			//if you find a word remove it
			if(query_dictionary(tempWord))
				empty_word(tempWord);
			//drop characters from end of string, remove if word is found
			for(var j = 0; j < tempWord2.size - 3; j++) {
				tempWord2 = tempWord2.slice(-1);
				if(query_dictionary(tempWord2)) 
					empty_word(tempWord2);
			}
			tempWord = tempWord.slice(1);
		}
	}

	empty_word(theWord) {
		let regex = /theWord/i;
		let newStomach = stomach.replace(regex, '');

		this.stomach = newStomach;
	}
}