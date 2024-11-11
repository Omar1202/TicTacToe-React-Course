import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from './components/winning-combinations';
import GameOver from "./components/GameOver/GameOver";


const PLAYERS =  {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function identifyActivePlayer(gameBoard) {
  let currentPlayer = 'X';

  if(gameBoard.length > 0 && gameBoard[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const move of gameTurns) {
    const { square, player } = move;
    const { row, col } = square;
  
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  
  for (const wnn_scn of WINNING_COMBINATIONS) {
    const playPerSymbol = [
      gameBoard[wnn_scn[0].row][wnn_scn[0].column],
      gameBoard[wnn_scn[1].row][wnn_scn[1].column],
      gameBoard[wnn_scn[2].row][wnn_scn[2].column]
    ]
    console.log("----------------------------");
    console.log(playPerSymbol);
    if (playPerSymbol[0] && playPerSymbol[0] === playPerSymbol[1] && playPerSymbol[0] === playPerSymbol[2]) {
      winner = players[playPerSymbol[0]];
    }
  }
  return winner;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [ gameTurns , setGameTurns ] = useState([]);
  
  const activePlayer = identifyActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  let hasDraw = false;


  if(!winner && gameTurns.length === 9) {
    hasDraw = true;
  }

  function handleSelectSquare(rowI, colI) {
    setGameTurns( (prevTurns) => {
      const currentPlayer = identifyActivePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowI, col: colI}, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    })
  }

  function handleRestartGame() {
    setGameTurns([]);
  }

  function handleSaveName(symbol,name) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: name //Esto permite cambiar el valor, sin importar lo que venga dentro.
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onUpdateName={handleSaveName}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onUpdateName={handleSaveName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restartF={handleRestartGame}/>}
        <GameBoard board={gameBoard} updateFunction={handleSelectSquare}/>
      </div>
      <Log movements={gameTurns} />
    </main>
  )
}

export default App
