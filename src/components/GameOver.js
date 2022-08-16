import './GameOver.css';

const GameOver = ({retry}) => {
  return (
    <div>
      <h1>End</h1>
      <button onClick={retry}>Começar novo jogo!</button>
    </div>
  )
}

export default GameOver;