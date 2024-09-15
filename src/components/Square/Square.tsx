import {useDrag, useDrop} from "react-dnd";
import {ColorEnum, MoveProps, PieceProps, PositionProps} from "../../pages/home";
import "./_square.scss";
import {classNames} from "../../Helper/Helper";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";


export interface SquareProps {
    position: PositionProps,
    piece: PieceProps | undefined,
    movePiece: (fromPosition: PositionProps, toPosition: PositionProps) => void,
    availableMoves: (currentPosition: PositionProps, piece: PieceProps) => void,
    selectedPosition: PositionProps | null
    lastBlackMove: MoveProps | undefined
    available: boolean,
}

export interface DragInterface {
    position: PositionProps,
}

export const Square = ({position, piece, movePiece, availableMoves, available, selectedPosition, lastBlackMove}: SquareProps): JSX.Element => {
    const [{ isDragging, }, drag, preview] = useDrag({
        type: 'Piece',
        item: {position: position},
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging()
        })
    }, [position]);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'Piece',
        canDrop: (item: DragInterface) => {
            return true;
        },
        drop: (item: DragInterface) =>  {
            movePiece(item.position, position)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [position]);
    console.log(lastBlackMove)
    function isSquareSelected() {
        if (lastBlackMove === undefined) {
            return selectedPosition === position;
        }

        return lastBlackMove.to === position ||
            lastBlackMove.from === position ||
            selectedPosition === position;
    }

    const className = classNames(
        'square',
        isSquareSelected() ? 'square--selected' : '',
    );

    function getImage(piece: PieceProps|undefined, available: boolean) {
        let image;
        if (piece !== undefined) {
            image = <img ref={drag}
                         onClick={() => availableMoves(position, piece)}
                         src={require(`../../assets/images/default-${piece.type}-${piece.color}.svg`).toString()}
                         alt={piece?.type}
                         style={{cursor: isDragging ? "grabbing" : "grab"}}
            />
        }
        if (available) {
            image = <>
                {image}
                <div className={piece === undefined ? "square__available" : "square__available-with-image"}></div>
            </>
        }
        return image;
    }

    return (
        <div ref={drop} className={className}
             id={position.x.toString().concat(position.y.toString())}>
            <div className={"square__image"}>
                {
                    getImage(piece, available)
                }
            </div>
        </div>
    )
};