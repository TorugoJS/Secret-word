import './Game.css';
import { useState, useRef } from 'react'

const Game = ({ veriryLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score }) => {

    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null)


    const handleSubmit = (e) => {
        e.preventDefault();

        veriryLetter(letter);

        setLetter("")

        //focando no elemento após o envio da letra, deixando aberto para digitar
        letterInputRef.current.focus()
    }

    return (
        <div className="game">

            <p className="points">
                <span>Pontuação: {score}</span>
            </p>

            <h1>Advinhe o campeão:</h1>

            <h3 className="tip">
                Dica sobre o campeão! <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} chance(s).</p>

            <div className="wordContainer">
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="letter">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
            </div>

            <div className="letterContainer">
                <p>Tenta advinhar uma letra:</p>
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="letter"
                    maxLength="1"
                    required
                    onChange={(e) => setLetter(e.target.value)}
                    value={letter}
                    ref={letterInputRef}
                     />
                <button>Jogar!</button>
            </form>

            <div className="wrongLettersContainer">
                <p>Letras erradas</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}-</span>
                ))}
            </div>

        </div>
    )
}

export default Game;