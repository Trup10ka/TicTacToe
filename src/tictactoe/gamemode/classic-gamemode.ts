import { GameMode } from "./gamemode"
import { PlaceTileResult } from "../session/place-tile-result"
import { Symbol } from "../data/symbol"

export class ClassicGamemode implements GameMode
{
    public checkWinCondition(board: number[][]): Symbol
    {
        throw new Error("Method not implemented.")
    }

    public canPlaceTile(symbolAtChosenCords: Symbol): PlaceTileResult
    {
        return symbolAtChosenCords === Symbol.EMPTY ? PlaceTileResult.SUCCESS : PlaceTileResult.ALREADY_PLACED_TILE;
    }

    public getName(): string
    {
        return "CLASSIC"
    }
}