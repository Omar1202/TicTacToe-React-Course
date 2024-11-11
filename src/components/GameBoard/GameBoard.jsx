export default function GameBoard({ board, updateFunction }) {
    // const [ gameBoard, updateGameBoard ] = useState(initialGameBoard);


    // function handleCellClick(row, col) {
    //     updateGameBoard( (prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[row][col] = symbol;
    //         return updatedBoard;
    //     });
    //     updateFunction();
    // }
    
    return (
        <ol id="game-board">
            {board.map( (row, rowIndex) => 
            <li key={rowIndex}>
                <ol>
                    {row.map( (column, columnIndex ) => 
                        <li key={columnIndex}>
                            <button onClick={() => updateFunction(rowIndex, columnIndex)} disabled={column !== null}>{column}</button>
                        </li> )}
                </ol>
            </li> )}
        </ol>
    );
}