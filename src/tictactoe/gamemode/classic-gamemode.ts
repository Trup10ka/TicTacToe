import { GameMode } from "./gamemode"
import { PlaceTileResult } from "../session/place-tile-result"
import { Symbol } from "../data/symbol"
import {
    consecutiveToWin,
    hasConsecutiveSymbolInColumn,
    hasConsecutiveSymbolInDiagonal, hasConsecutiveSymbolInRow
} from "../../util/gamemode/game-mode-utill";


export class ClassicGamemode implements GameMode
{
    public checkWinCondition(board: number[][]): Symbol
    {
        const boardSize = board.length
        const diagonalCheck = hasConsecutiveSymbolInDiagonal(board, consecutiveToWin(boardSize))
        const verticalCheck = hasConsecutiveSymbolInColumn(board, consecutiveToWin(boardSize))
        const horizontalCheck = hasConsecutiveSymbolInRow(board, consecutiveToWin(boardSize))

        if (diagonalCheck !== Symbol.EMPTY)
            return diagonalCheck
        else if (verticalCheck !== Symbol.EMPTY)
            return verticalCheck
        else if (horizontalCheck !== Symbol.EMPTY)
            return horizontalCheck
        else
            return Symbol.EMPTY
    }

    public canPlaceTile(symbolAtChosenCords: Symbol): PlaceTileResult
    {
        return symbolAtChosenCords === Symbol.EMPTY ? PlaceTileResult.SUCCESS : PlaceTileResult.ALREADY_PLACED_TILE;
    }

    public getName(): string
    {
        return "CLASSIC"
    }
}