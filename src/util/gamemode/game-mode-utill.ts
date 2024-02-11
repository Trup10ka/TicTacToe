import { Symbol } from "../../tictactoe/data/symbol";

export function hasConsecutiveSymbolInDiagonal(matrix: number[][], targetCount: number): number
{
    const rows = matrix.length
    const cols = matrix[0].length

    for (let i = 0; i < rows; ++i)
    {
        for (let j = 0; j < cols; ++j)
        {
            if (matrix[i][j] === Symbol.EMPTY || matrix[i][j] === Symbol.J) continue

            const symbolToCheck = matrix[i][j]
            let consecutiveCount = 1
            let k = 1
            while (i + k < rows && j + k < cols && matrix[i + k][j + k] === symbolToCheck)
            {
                consecutiveCount++
                k++
            }

            if (consecutiveCount >= targetCount)
            {
                return symbolToCheck
            }
        }
    }
    return Symbol.EMPTY
}

export function hasConsecutiveSymbolInRow(matrix: number[][], targetCount: number): number
{
    const rows = matrix.length
    const cols = matrix[0].length

    for (let i = 0; i < rows; ++i)
    {
        for (let j = 0; j < cols; ++j)
        {
            if (matrix[i][j] === Symbol.EMPTY || matrix[i][j] === Symbol.J) continue

            const symbolToCheck = matrix[i][j]
            let consecutiveCount = 1
            let k = 1
            while (j + k < cols && matrix[i][j + k] === symbolToCheck)
            {
                consecutiveCount++
                k++
            }

            if (consecutiveCount >= targetCount)
            {
                return symbolToCheck
            }
        }
    }
    return Symbol.EMPTY
}

export function hasConsecutiveSymbolInColumn(matrix: number[][], targetCount: number): number
{
    const rows = matrix.length
    const cols = matrix[0].length

    for (let i = 0; i < rows; ++i)
    {
        for (let j = 0; j < cols; ++j)
        {
            if (matrix[i][j] === Symbol.EMPTY || matrix[i][j] === Symbol.J) continue

            const symbolToCheck = matrix[i][j]
            let consecutiveCount = 1
            let k = 1
            while (i + k < rows && matrix[i + k][j] === symbolToCheck)
            {
                consecutiveCount++
                k++
            }

            if (consecutiveCount >= targetCount)
            {
                return symbolToCheck
            }
        }
    }
    return Symbol.EMPTY
}

export function consecutiveToWin(size: number): number
{
    return size > 5 ? 5 : 3
}
