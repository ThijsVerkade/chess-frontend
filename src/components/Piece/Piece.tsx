import {SquareProps} from "../Square/Square";
import {ColorEnum, PieceProps, PiecesEnums, PositionProps} from "../../pages/home";


export function pieceToHtmlCharacter(piece: PieceProps) {
    switch (piece.type) {
        case PiecesEnums.Bishop:
            return piece.color === ColorEnum.Black ? '♝' : '♗';
        case PiecesEnums.King:
            return piece.color === ColorEnum.Black ? '♚' : '♔';
        case PiecesEnums.Queen:
            return piece.color === ColorEnum.Black ? '♛' : '♕';
        case PiecesEnums.Rook:
            return piece.color === ColorEnum.Black ? '♜' : '♖';
        case PiecesEnums.Knights:
            return piece.color === ColorEnum.Black ? '♞' : '♘';
        case PiecesEnums.Pawn:
            return piece.color === ColorEnum.Black ? '♟︎' : '♙';
        default:
            return '';
    }
}

export function numberToChessPosition(position: PositionProps) {
    const column = String.fromCharCode((position.x % 8) + 97);

    return `${column}${position.y + 1}`;
}
