import './Game.css';

const Game = ({ veriryLetter }) => {
    return (
        <div className="game">

            <p className="points">
                <span>Pontuação: 0</span>
            </p>

            <h1>Advinhe o campeão:</h1>

            <h3 className="tip">
                Dica sobre o campeão! <span>Dica...</span>
            </h3>

            <div className="wordContainer">
                <span className="letter">a</span>
                <span className="blankSquare"></span>
            </div>

            <div className="letterContainer">
                <p>Tenta advinhar uma letra:</p>
            </div>

            <form>
                <input type="text" name="letter" maxLength="1" required />
                <button>Jogar!</button>
            </form>

            <div className="wrongLettersContainer">
            <p>Letras erradas</p>
            <span>a,</span>
            <span>b,</span>
            </div>

        </div>
    )
}

export default Game;