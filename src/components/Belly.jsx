import { dictionaryAPI } from '../js/utilities';

//mouth prop receives letters to be added to the belly
function Belly({ mouth, score }) {
  [stomach, setStomach] = useState('');

  const destruct = () => setStomach('');

  function update() {
    if (mouth === '~') {
      searchBelly();
      return;
    }

    setStomach(stomach => (stomach += mouth));
  }

  //creates the array of all possible words
  async function searchBelly() {
    // Abort if stomach is empty or is 1 or less letters
    if (stomach === '' || stomach.length <= 1) return;

    let wordsArr = [];

    //tempStomach to be searched
    let tempStomach = stomach;

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
    if (stomach !== tempStomach) searchBelly();
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
      console.log('Setting ' + theWord + ' False');
      valid = false;
    } else {
      console.log('Setting ' + theWord + ' True');
      valid = true;
      removeWord(theWord);
      //use context to set the score for the gameboard
      //scoreWord(theWord);
    }
    return valid;
  }

  //revoes words from the belly
  function removeWord(theWord) {
    //turn word into reg exp search
    const regex = new RegExp(theWord, 'i');

    //replace with empty string
    setStomach(prevStomach => prevStomach.replace(regex, ''));
  }
}

export default Belly;
