import './Game.css';

const Game = ({ veriryLetter }) => {
    return (
        <div>
            <h1>Game</h1>
            <button onClick={veriryLetter}> Finalizar jogo?</button>
        </div>
    )
}

export default Game;