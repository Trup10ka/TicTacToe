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
export * as utils from "./util"