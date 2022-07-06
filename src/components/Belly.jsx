import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setBelly } from './bellySlice';
import { setFullBelly } from './GameContainer/gameContainerSlice';
import regeneratorRuntime from 'regenerator-runtime';

//mouth prop receives letters to be added to the belly
function Belly() {
  const dispatch = useDispatch();
  const stomach = useSelector(state => state.belly);
  const fullBelly = useSelector(state => state.gameContainer.fullBelly);

  let tempBelly = `${stomach}`;

  useEffect(() => {
    update();
  }, [stomach]);

  useEffect(() => {
    if (fullBelly) {
      dispatch(setBelly('YOU SUCK!!'));
    }
  }, [fullBelly]);

  function update() {
    if (tempBelly.at(tempBelly.length - 1) !== '~' && tempBelly.length > 10) {
      dispatch(setFullBelly());
    }
    if (tempBelly.at(tempBelly.length - 1) === '~') {
      tempBelly = tempBelly.replace('~', '');
      searchBelly();
      return;
    }
  }

  //creates the array of all possible words
  async function searchBelly() {
    // Abort if stomach is empty or is 1 or less letters
    if (tempBelly === '' || tempBelly.length <= 1) return removeWord('~');

    let wordsArr = [];

    //tempStomach to be searched
    let tempStomach = tempBelly;

    //tempStomach tempStomach
    //find all possible contiguous subsets of stomach
    for (let i = 0; i < tempStomach.length; i++) {
      for (let j = i; j < tempStomach.length; j++) {
        let newStr = '';
        for (let k = i; k <= j; k++) {
          newStr += tempStomach[k];
        }
        //we only care about them if they are at least 2 letters long
        //lazy way out, consider reworking logic eliminating unecessary loops
        if (newStr.length >= 2) {
          wordsArr.push(newStr);
        }
      }
    }

    //sort array by length, longest to shortest
    wordsArr.sort(function (a, b) {
      return b.length - a.length;
    });

    //sending words to be searched, will break when first word is found
    for (const word of wordsArr) {
      const validWord = await checkWord(word);
      if (validWord) break;
    }

    //If the belly has changed search again to check for other words
    if (tempBelly !== tempStomach) searchBelly();
  }

  //calls the API, checks returned JSON to see if a word came back
  async function checkWord(theWord) {
    let valid = false;

    const jsonReturned = await dictionaryAPI(theWord);

    if (
      jsonReturned.title === 'No Definitions Found' ||
      jsonReturned[0].meanings[0].partOfSpeech === 'symbol' ||
      jsonReturned[0].meanings[0].partOfSpeech === 'abbreviation' ||
      jsonReturned[0].meanings[0].partOfSpeech === 'prefix' ||
      jsonReturned[0].meanings[0].partOfSpeech === 'suffix'
    ) {
      valid = false;
      removeWord('~');
    } else {
      valid = true;
      removeWord(theWord);
      //use context to set the score for the gameboard
      //scoreWord(theWord);
    }
    return valid;
  }

  //API fetch
  async function dictionaryAPI(theWord) {
    const requestURL =
      'https://api.dictionaryapi.dev/api/v2/entries/en/' + theWord;
    const response = await fetch(requestURL);
    return await response.json();
  }

  //revoes words from the belly
  function removeWord(theWord) {
    //turn word into reg exp search
    const regex = new RegExp(theWord, 'i');

    //replace with empty string
    const newBelly = tempBelly.replace(regex, '');
    dispatch(setBelly(newBelly));
  }

  return (
    <div id="belly">
      {stomach.split('').map((letter, index) => {
        if (index < 10) return <p className="tileBelly">{letter}</p>;
      })}
    </div>
  );
}

export default Belly;
