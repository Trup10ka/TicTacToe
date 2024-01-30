import {GameMode} from "./gamemode";

export class JesterGamemode implements GameMode
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

    public getName(): string
    {
        return "JESTER"
    }
}