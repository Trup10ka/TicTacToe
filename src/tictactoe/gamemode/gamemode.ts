import { PlaceTileResult } from "../session/place-tile-result";
import { Symbol } from "../data/symbol";

export interface GameMode
{
    checkWinCondition(board: number[][]): boolean

    canPlaceTile(x: number, y: number, symbol: Symbol): PlaceTileResult

    nextPlayer(): boolean

    getName(): string
}