import { PlaceTileEvent } from "../tictactoe/data/place-tile-state";
import { SessionState } from "../tictactoe/data/session-state";

export function immutableCopyOf<T>(array: T[]): readonly T[]
{
    return [...array]
}
export function initializeEmptyPlayground(size: number): number[][]
{
    let playground = new Array(size) as number[][]

    for (let i = 0; i < size; i++)
    {
        playground[i] = new Array(size).fill(0)
    }
    return playground
}

export function generateGameId(): string
{
    let id = ""

    for (let i = 0; i < 5; i++)
    {
        id += getRandomNumber()
        if (i == 2) id += "-"
        id += getRandomLetter()
    }

    return id
}

export function getRandomLetter(): string
{
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

export function getRandomNumber(): number
{
    return Math.floor(Math.random() * 10)
}

export function processPlaceTileRequest(code: number) : string
{
    if (code <= 3)
        return PlaceTileEvent[code].toString()
    else
        return SessionState[code].toString()
}

export function date(): string
{
    return new Date().toLocaleString()
}
export * as utils from "./util"