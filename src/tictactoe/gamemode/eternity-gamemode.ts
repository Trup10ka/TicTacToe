import { GameMode } from "./gamemode";

export class EternityGamemode implements GameMode
{
    public checkWinCondition(board: number[][]): boolean
    {
        throw new Error("Method not implemented.")
    }

    public nextPlayer(): boolean
    {
        throw new Error("Method not implemented.")
    }

    public placeGameTile(x: number, y: number): boolean
    {
        throw new Error("Method not implemented.")
    }

    public getName(): string
    {
        return "ETERNITY"
    }
}