import "./_board.scss";
import {Square} from "../Square/Square";
import {ColorEnum, MoveProps, PieceProps, PositionProps, SquareProps} from "../../pages/home";
import axios from "axios";
import {numberToChessPosition} from "../Piece/Piece";
import {
    updateBoard,
    movePiece as reduxMovePiece,
    resetMove,
    removeAvailableMoves, setAvailableMoves
} from "../../redux/actions/boardActions";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";


interface BoardProps {
    squares: SquareProps[][],
    gameUuid: string,
    selectedPosition: PositionProps | null,
}

interface MovePieceProps {
    board: {
        squares?: SquareProps[][],
        lastMoveFrom: PositionProps,
        lastMoveTo: PositionProps,
    },
}

interface AvailablePositionsProps {
    positions: PositionProps[],
}


export const Board = ({squares, gameUuid, selectedPosition}: BoardProps): JSX.Element => {
    const {moves} = useSelector((state: State) => state.board);
    const dispatch = useDispatch();

    function movePiece(fromPosition: PositionProps, toPosition: PositionProps)  {
        dispatch(removeAvailableMoves());

        const fromPiece = squares[fromPosition.y][fromPosition.x].piece
        const toPiece = squares[toPosition.y][toPosition.x].piece

        dispatch(reduxMovePiece({fromPosition, toPosition, changeSquares: true}))

        axios.post<MovePieceProps>(`http://localhost:8080/api/game/${gameUuid}/move-piece`, {
            start_move: numberToChessPosition(fromPosition),
            end_move: numberToChessPosition(toPosition)
        })
            .then(response => {
                const {board } = response.data;

                dispatch(updateBoard({
                    board: board
                }));

                opponentMove();
            })
            .catch(error => {
                dispatch(resetMove({
                    fromPosition,
                    fromPiece,
                    toPosition,
                    toPiece
                }))
                return;
            });
    }

    function opponentMove() {
        axios.get<MovePieceProps>(`http://localhost:8080/api/game/${gameUuid}/opponent-move`)
            .then(response => {
                const {board} = response.data;

                dispatch(reduxMovePiece({
                    toPosition: board.lastMoveTo,
                    fromPosition: board.lastMoveFrom,
                    changeSquares: true
                }))
                dispatch(updateBoard({
                    board: board
                }));
            })
            .catch(error => {
                console.log(error)
                // opponentMove();
                return;
            })
    }

    async function getAvailableMoves(currentPosition: PositionProps, piece: PieceProps) {
        if (selectedPosition === currentPosition) {
            return;
        }

        dispatch(removeAvailableMoves());

        await axios.post<AvailablePositionsProps>(`http://localhost:8080/api/game/${gameUuid}/available-positions`, {
            position: numberToChessPosition(currentPosition)
        }).then(response => {
            const {positions} = response.data;

            dispatch(setAvailableMoves({
                selectedPosition: currentPosition,
                availableMoves: positions
            }))
        });
    }

    const lastBlackMove = moves.filter(move => move.piece.color === ColorEnum.Black).at(-1);

    return (
        <div className="chess-board">
            {
                squares.slice(0).reverse().map(square =>
                    square.map(s =>
                        <Square
                            lastBlackMove={lastBlackMove}
                            available={s.available}
                            position={s.position}
                            selectedPosition={selectedPosition}
                            availableMoves={(currentPosition, piece) => getAvailableMoves(currentPosition, piece)}
                            piece={s.piece === null ? undefined : s.piece}
                            movePiece={(fromPosition, toPosition) => movePiece(fromPosition, toPosition)}/>
                    )
                )
            }
        </div>
    )
};