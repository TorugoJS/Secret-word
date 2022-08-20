
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

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)


  const pickedWordAndCategory = () => {

    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)


    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word);

    return { word, category };
  }

  const startGame = () => {
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
  }


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

    }

  };


  console.log(guessedLetters)
  console.log(wrongLetters)

  const retry = () => {
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

      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
