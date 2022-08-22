
// Css
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';


// Data
import { wordsList } from "./data/words";


// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

const guessesQtd = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQtd)
  const [score, setScore] = useState(0)


  const pickedWordAndCategory = useCallback(() => {

    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)


    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word);

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {

    clearLetterStates();

    const { word, category } = pickedWordAndCategory();

    // separar letras
    let wordLetters = word.split("");

    // colocando todas as letras minúsculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(wordLetters);
    console.log(word, category);

    //Setar estados

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name)
  }, [pickedWordAndCategory]);


  const veriryLetter = (letter) => {
    const normalizedletter = letter.toLowerCase()

    if (guessedLetters.includes(normalizedletter) || wrongLetters.includes(normalizedletter)
    ) {
      return;
    }

    if (letters.includes(normalizedletter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedletter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedletter
      ]);


      setGuesses((actualGuesses) => actualGuesses - 1);
    }

  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }



  useEffect(() => {

    if (guesses <= 0) {

      clearLetterStates()
      setGameStage(stages[2].name)

    }

  }, [guesses])

  // console.log(guessedLetters)
  // console.log(wrongLetters)

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 100)


      startGame();
    }

    console.log(uniqueLetters);

  }, [guessedLetters, letters, startGame]);


  const retry = () => {
    setScore(0)
    setGuesses(guessesQtd)

    setGameStage(stages[0].name)
  }


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}

      {gameStage === "game" && <Game
        veriryLetter={veriryLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}

      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
