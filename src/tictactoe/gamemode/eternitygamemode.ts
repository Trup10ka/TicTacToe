import { GameMode } from "./gamemode";

export class EternityGameMode implements GameMode
{
    checkWinCondition(board: number[][]): boolean
    {
        throw new Error("Method not implemented.")
    }

    nextPlayer(): boolean
    {
        throw new Error("Method not implemented.")
    }

    placeGameTile(x: number, y: number): boolean
    {
        throw new Error("Method not implemented.")
    }
}