import {createReducer} from '@reduxjs/toolkit'
import {
    boardResignGame,
    boardStartGame,
    GameStateProps,
    movePiece, removeAvailableMoves,
    resetMove, setAvailableMoves,
    updateBoard
} from "../actions/boardActions";
import {stat} from "fs";


const initialState: GameStateProps = {
    game_uuid: '',
    board: {},
    selectedPosition: null,
    moves: []
};

const boardReducer =  createReducer(initialState, (builder) => {
    builder
        .addCase(removeAvailableMoves, (state) => {
            state.selectedPosition = null;

            if (state.board.squares === undefined) {
                return;
            }

            state.board.squares.forEach(squaresY => {
                squaresY.forEach(square => {
                    square.available = false;
                    square.position
                })
            })
        })
        .addCase(setAvailableMoves, (state, action) => {
            state.selectedPosition = action.payload.selectedPosition;

            action.payload.availableMoves.forEach(setAvailableMove => {
                if (state.board.squares !== undefined) {
                    state.board.squares[setAvailableMove.y][setAvailableMove.x].available = true;
                }
            })
        })
        .addCase(movePiece, (state, action) => {
            const from = action.payload.fromPosition;
            const to = action.payload.toPosition;

            // @ts-ignore
            state.moves = [...state.moves, {from: from, to: to, piece: state.board.squares[from.y][from.x].piece}];

            if (state.board.squares !== undefined) {
                state.board.squares[to.y][to.x].piece = state.board.squares[from.y][from.x].piece
                state.board.squares[from.y][from.x].piece = null
            }
        })
        .addCase(resetMove, (state, action) => {
            const from = action.payload.fromPosition;
            const to = action.payload.toPosition;

            if (state.board.squares !== undefined) {
                state.board.squares[from.y][from.x].piece = action.payload.fromPiece
                state.board.squares[to.y][to.x].piece = action.payload.toPiece
            }
        })
        .addCase(boardResignGame, (state) => {
            state.game_uuid = initialState.game_uuid;
            state.board = initialState.board;
        })
        .addCase(updateBoard, (state, action) => {
            state.board = action.payload.board;
        })
        .addCase(boardStartGame, (state, action) => {
            state.game_uuid = action.payload.game_uuid;
            state.board = action.payload.board;
        });
});

export default boardReducer;