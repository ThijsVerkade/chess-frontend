import React, {useState} from 'react';
import './_chessForm.scss';

interface ChessFromProps {
    onNewGame: () => void,
    onContinueGame: (gameUuid: string) => void,
}

export const ChessForm = ({onNewGame, onContinueGame}: ChessFromProps): JSX.Element => {
    const [continueGame, setContinueGame] = useState<Boolean>(false);
    const [gameUuid, setGameUuid] = useState<string>("");

    return (
        <div className="ChessForm">
            <img  className="ChessForm__Gif" src={require('../../assets/gif/chess-game-1.gif')} alt="chess-game-gif"/>
            <div className={continueGame ? "ChessForm__Button_Group ChessForm__Button_Group--hide" : "ChessForm__Button_Group ChessForm__Button_Group--show"}>
                <button className="ChessForm__Button" type="submit" onClick={() => onNewGame()}>
                    New Game
                </button>
                <button className="ChessForm__Button" type="submit" onClick={() => setContinueGame(true)}>
                    Continue Game
                </button>
            </div>
            <div className={continueGame ? "ChessForm__Group ChessForm__Group--show" : "ChessForm__Group ChessForm__Group--hide"} >
                <label className="ChessForm__Label">
                    Enter Game Code
                </label>
                <div className="ChessForm__InputGroup">
                    <input className="InputGroup__Input" type="text" id="name" value={gameUuid} onChange={e => setGameUuid(e.target.value)} />
                </div>
                <div className="ChessForm__Button_Group">
                    <button className="ChessForm__Button" type="submit" onClick={() => onContinueGame(gameUuid)}>
                        Join game
                    </button>
                    <button className="ChessForm__Button" type="submit" onClick={() => setContinueGame(false)}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};