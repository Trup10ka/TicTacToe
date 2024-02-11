import { GameMode } from "./gamemode"
import { PlaceTileResult } from "../session/place-tile-result"
import { Symbol } from "../data/symbol"

export class EternityGamemode implements GameMode
{
    public checkWinCondition(board: number[][]): Symbol
    {
        throw new Error("Method not implemented.")
    }

    public canPlaceTile(symbol: Symbol): PlaceTileResult
    {
        throw new Error("Method not implemented.")
    }

    public getName(): string
    {
        return "ETERNITY"
    }
}