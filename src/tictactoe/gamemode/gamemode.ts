import { PlaceTileResult } from "../session/place-tile-result"
import { Symbol } from "../data/symbol"

export interface GameMode
{
    checkWinCondition(board: number[][]): Symbol

    canPlaceTile(symbolAtChosenCords: Symbol): PlaceTileResult

    getName(): string
}