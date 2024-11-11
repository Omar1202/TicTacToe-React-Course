import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onUpdateName}) {
    const [ playerName, setPlayerName ] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false);

    function handleClick() {
        setIsEditing( editing => !editing );

        if (isEditing) {
            onUpdateName(symbol, playerName);
        }

    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    
    let content = (
        <span className="player-name">{playerName}</span>
    );
    if (isEditing) {
        content = (
            <input type="text" required value={playerName} onChange={handleChange} />
        );
    }
    
    return (
        <li className={isActive ? "active": undefined}>
        <span className="player">
            {content}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing ? "Save": "Edit"}</button>
    </li>
        
    );
}