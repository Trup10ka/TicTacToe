import { PlaceTileResult } from "../session/place-tile-result"
import { Symbol } from "../data/symbol"

export interface GameMode
{
    checkWinCondition(board: number[][]): boolean

    canPlaceTile(symbolAtChosenCords: Symbol): PlaceTileResult

    nextPlayer(): boolean

    getName(): string
}