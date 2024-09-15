import {createAction} from "@reduxjs/toolkit";
import {ActionType} from "../actionTypes";
import {MoveProps, PieceProps, PositionProps, SquareProps} from "../../pages/home";

export interface GameStateProps {
    game_uuid: string;
    board: {squares?: SquareProps[][]};
    selectedPosition: PositionProps | null,
    moves: MoveProps[],
}

export interface UpdateBoardInterface {
    board: {squares?: SquareProps[][]},
}

export interface MovePieceInterface {
    fromPosition: PositionProps,
    toPosition: PositionProps,
    changeSquares: boolean
}

export interface ResetMoveInterface {
    fromPosition: PositionProps,
    fromPiece: PieceProps | null,
    toPosition: PositionProps,
    toPiece: PieceProps | null,
}

export interface SetAvailableMovesInterface {
    selectedPosition: PositionProps,
    availableMoves: PositionProps[],
}

export const boardStartGame = createAction<GameStateProps>(ActionType.BOARD_START_GAME);
export const updateBoard = createAction<UpdateBoardInterface>(ActionType.UPDATE_BOARD);
export const boardResignGame = createAction(ActionType.BOARD_RESIGN_GAME);
export const movePiece = createAction<MovePieceInterface>(ActionType.MOVE_PIECE);
export const resetMove = createAction<ResetMoveInterface>(ActionType.RESET_MOVE);
export const removeAvailableMoves = createAction(ActionType.REMOVE_AVAILABLE_MOVES);
export const setAvailableMoves = createAction<SetAvailableMovesInterface>(ActionType.SET_AVAILABLE_MOVES);