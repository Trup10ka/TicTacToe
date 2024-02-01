import { PlaceTileResult } from "../session/place-tile-result";

export interface GameMode
{
    checkWinCondition(board: number[][]): boolean

    canPlaceTile(x: number, y: number): PlaceTileResult

    nextPlayer(): boolean

    getName(): string
}