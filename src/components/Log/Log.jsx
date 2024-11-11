export default function Log({movements}) {

    return (
        <ol id="log">
            {
                movements.map(move => (
                    <li key={`${move.square.row}${move.square.col}`}>Move from {move.player} on {move.square.row},{move.square.col}</li>
                ))
            }
        </ol>
    )
}