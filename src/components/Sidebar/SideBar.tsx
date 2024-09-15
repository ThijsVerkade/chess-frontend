import "./_sidebare.scss";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {numberToChessPosition, pieceToHtmlCharacter} from "../Piece/Piece";
import {MoveProps} from "../../pages/home";

export interface SidebarProps {
    resignAction: () => void
}

export const Sidebar = ({resignAction}: SidebarProps): JSX.Element => {
    const {moves} = useSelector((state: State) => state.board);

    let groupedMoves: {white: MoveProps, black: MoveProps | undefined}[] = [];

    moves.map((move, index) => {
        if(index % 2 === 0) {
            groupedMoves.push({white: move, black: moves[index + 1]})
        }
    });

    return (
        <div className="sidebar">
            <div className="sidebar__inside">
                <img alt="bot-profile-picture" src={require('../../assets/images/chess-bot.png')}/>
                <div className="sidebar__move-list">
                    {
                        groupedMoves.map((move, index) =>
                            <div className="move__row">
                                <div className="move__index">{index + 1}</div>
                                <div className="move__item move--white">
                                    {numberToChessPosition(move.white?.to)} ({pieceToHtmlCharacter(move.white.piece)})
                                </div>
                                {
                                    move.black !== undefined
                                        ? <div className="move__item move--black">
                                            {numberToChessPosition(move.black?.to)} ({pieceToHtmlCharacter(move.black.piece)})
                                          </div>
                                        : ''
                                }
                            </div>
                        )
                    }
                </div>
                <button className="sidebar__inside__Button" onClick={resignAction}>resign</button>
            </div>
        </div>
    )
}