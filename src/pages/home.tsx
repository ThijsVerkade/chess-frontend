import React, {useEffect, useState} from 'react';
import {Board} from "../components/Board/Board";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../redux/reducers";
import {boardResignGame, boardStartGame, GameStateProps, updateBoard} from "../redux/actions/boardActions";
import {ChessForm} from "../components/ChessForm/ChessForm";
import {Loader} from "../components/Loader/Loader";
import {Sidebar} from "../components/Sidebar/SideBar";

export interface PositionProps {
    x: number;
    y: number;
}

export interface MoveProps {
    piece: PieceProps,
    from: PositionProps,
    to: PositionProps,
}

export enum ColorEnum {
    Black = 'black',
    White = 'white',
}

export enum PiecesEnums {
    Bishop = 'bishop',
    Knights = 'knight',
    King = 'king',
    Pawn = 'pawn',
    Queen = 'queen',
    Rook = 'rook',
}

export interface PieceProps {
    color: ColorEnum;
    type: PiecesEnums;
}

export interface SquareProps {
    color: ColorEnum;
    piece: PieceProps | null;
    position: PositionProps;
    available: boolean;
}

export const Home = (): JSX.Element => {
    const { board, game_uuid: gameUuid, selectedPosition} = useSelector((state: State) => state.board);

    const dispatch = useDispatch();

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    const startGame = async (): Promise<void> => {
        setLoading(true);

        await axios.post<GameStateProps>('http://localhost:8080/api/game/start')
            .then(async (response): Promise<void> => {
                await delay(3000);
                const {data} = response;
                dispatch(boardStartGame(data));
                setLoading(false);
            });
    };

    const resignGame = async (): Promise<void> => {
        setLoading(true);

        dispatch(boardResignGame());

        await axios.put<GameStateProps>(`http://localhost:8080/api/game/${gameUuid}/resign`)
            .then(async (response): Promise<void> => {
                await delay(3000);
                setLoading(false);
            });
    };

    const continueGame = async (gameUuid: string): Promise<void> => {
        setLoading(true);


        await axios.post<GameStateProps>(`http://localhost:8080/api/game/${gameUuid}/continue`)
            .then(async (response): Promise<void> => {
                await delay(3000);
                const {data} = response;
                dispatch(boardStartGame(data));
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const [loading, setLoading] = useState<Boolean>(false);

    let body: JSX.Element;

    if (loading) {
        body = (
            <div style={{display: "flex", alignItems: "center",  justifyContent: "center", height: "100vh"}}>
                <Loader/>
            </div>
        )
    } else if (board.squares === undefined) {
        body = (
            <div style={{display: "flex", alignItems: "center",  justifyContent: "center", height: "100vh"}}>
                <ChessForm onNewGame={startGame}
                           onContinueGame={continueGame}/>
            </div>
        )
    } else {
        body = (
            <>
                <div className="board-layout">
                <Board squares={board.squares}
                       gameUuid={gameUuid}
                       selectedPosition={selectedPosition}/>
                </div>
                {<Sidebar resignAction={resignGame} />}
                {/*<MoveList />*/}
            </>
        )
    }

    return (body);
};