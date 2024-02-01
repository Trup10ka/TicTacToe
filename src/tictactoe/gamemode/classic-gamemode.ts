import { GameMode } from "./gamemode";
import { PlaceTileResult } from "../session/place-tile-result";

export class ClassicGamemode implements GameMode
{
    public checkWinCondition(board: number[][]): boolean
    {
        throw new Error("Method not implemented.")
    }

    public canPlaceTile(x: number, y: number): PlaceTileResult
    {
        return PlaceTileResult.SUCCESS
    }

    public nextPlayer(): boolean
    {
        throw new Error("Method not implemented.")
    }

    public getName(): string
    {
        return "CLASSIC"
    }
}