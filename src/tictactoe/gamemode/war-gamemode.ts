import { GameMode } from "./gamemode"
import {PlaceTileResult} from "../session/place-tile-result"
import { Symbol } from "../data/symbol"

export class WarGamemode implements GameMode
{
    public checkWinCondition(board: number[][]): boolean
    {
        throw new Error("Method not implemented.")
    }

    public nextPlayer(): boolean
    {
        throw new Error("Method not implemented.")
    }

    public canPlaceTile(x: number, y: number, symbol: Symbol): PlaceTileResult
    {
        throw new Error("Method not implemented.")
    }

    public getName(): string
    {
        return "WAR"
    }
}