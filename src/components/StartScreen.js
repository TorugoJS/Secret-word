import './StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Deseja jogar?</p>
        <button onClick={startGame}>Clique para começar!</button>
    </div>
  )
}

export default StartScreen;