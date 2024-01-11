export function generateGameId(): number
{
    return Math.random().toString(36).length
}
export * as utils from "./util"