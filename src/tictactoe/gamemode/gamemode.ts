export interface GameMode
{
    checkWinCondition(board: number[][]): boolean

    placeGameTile(x: number, y: number): boolean

    nextPlayer(): boolean

    getName(): string
}