
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
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]);


  const pickedWordAndCategory = () => {

    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)


    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word);

    return { word, category };
  }

  const startGame = () => {
    const { word, category } = pickedWordAndCategory();

    // separar palavras
    let wordLetters = word.split("");

    // colocando todas as letras minúsculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());

  console.log(wordLetters);
  console.log(word, category);

  //Setar estados

  setPickedWord(word);
  setPickedCategory(category);
  setLetters(letters);

  setGameStage(stages[1].name)
}


const veriryLetter = () => {
  setGameStage(stages[2].name)
}

const retry = () => {
  setGameStage(stages[0].name)
}


return (
  <div className="App">
    {gameStage === "start" && <StartScreen startGame={startGame} />}
    {gameStage === "game" && <Game veriryLetter={veriryLetter} />}
    {gameStage === "end" && <GameOver retry={retry} />}
  </div>
);
}

export default App;
