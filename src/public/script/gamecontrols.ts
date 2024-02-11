const url = new URL(window.location.href)

const currentPlayerName = document.getElementById("currently-playing-player") as HTMLDivElement
const currentPlayerSymbol = document.getElementById("player-char") as HTMLDivElement
const playgroundGrid = document.getElementById("playground-grid") as HTMLDivElement

const nameInputButton = document.getElementById("enter-name-button") as HTMLButtonElement
const nameInputField = document.getElementById("player-name-input") as HTMLInputElement
const namePopup = document.getElementById("popup") as HTMLDivElement

const winPopupName = document.getElementById("winning-player-name") as HTMLDivElement
const winPopupSymbol = document.getElementById("winning-player-symbol") as HTMLDivElement
const winPopup = document.getElementById("win-popup") as HTMLDivElement

const gameId = url.searchParams.get("id")!

// @ts-ignore
let ws: io.Socket
let playgroundDivArray: HTMLDivElement[][]

establishWebSocketConnection()
preparePlayground()

function placeSymbol(x: number, y: number)
{
    console.log("Placing symbol at: " + x + ", " + y)
    ws.emit("place-symbol", gameId, x, y)
}

function queryName()
{
    const playerName = nameInputField.value
    ws.emit("set-player-name", gameId, playerName)
    namePopup.classList.toggle("hide")
}

function toggleWinningScreen(winPLayerName: string, winPlayerSymbol: string)
{
    winPopupName.innerText = winPLayerName
    winPopupSymbol.innerText = winPlayerSymbol
    winPopup.classList.toggle("hide")
}

function establishWebSocketConnection()
{
    // @ts-ignore
    ws = new io("http://localhost:8000")

    configureWebsocket(ws)

    ws.emit("find-room", gameId)

    nameInputButton.disabled = false
}

function preparePlayground()
{
    ws.emit("get-game-data", gameId)
    ws.emit("playground-prepared", gameId)
}

function loadGrid(playground: number[][])
{
    playgroundGrid.classList.add("size-" + playground.length.toString())
    playgroundDivArray = new Array(playground.length)
    for (let x = 0; x < playground.length; x++)
    {
        playgroundDivArray[x] = new Array(playground[x].length)
        for (let i = 0; i < playground[x].length; i++)
        {
            const gameTileDiv = createTile(playground, x, i)
            playgroundDivArray[x][i] = gameTileDiv
            playgroundGrid.appendChild(gameTileDiv)
        }
    }
}

function createTile(playground: number[][], x: number, i: number) : HTMLDivElement
{
    const gameTileDiv = document.createElement("div")
    gameTileDiv.classList.add("tile-size-" + playground.length)
    gameTileDiv.classList.add("game-tile")
    gameTileDiv.onclick = () => placeSymbol(x, i)
    insertSymbol(gameTileDiv, playground[x][i])
    return gameTileDiv
}

function insertSymbol(tile: HTMLDivElement, symbol: number)
{
    if (symbol == 0)
        return
    else if (symbol == 1)
        tile.innerText = "X"
    else if (symbol == -1)
        tile.innerText = "O"
}

// @ts-ignore
function configureWebsocket(ws: io.Socket)
{
    ws.on("room-found", () => {
            ws.emit("join-room", gameId )
        }
    )
    ws.on("room-not-found", () => {
            // TODO: Implement redirect to error HTML page
        }
    )
    ws.on("room-is-full", () => {
            // TODO: Implement redirect to error HTML page
        }
    )
    ws.on("player-name-set", (playerName: string, playerSymbol: string) => {
            currentPlayerName.innerText = playerName
            currentPlayerSymbol.innerText = playerSymbol
        }
    )
    ws.on("game-data", (playground: number[][]) => {
            loadGrid(playground)
            // TODO: Load currently playing player
        }
    )
    ws.on("symbol-placed", (x: number, y: number, symbol: string) => {
            console.log("Server approved at: " + x + ", " + y)
            playgroundDivArray[x][y].innerText = symbol
        }
    )
    ws.on("symbol-not-placed", (reason: string) => {
            console.log("Symbol not placed: " + reason)
        }
    )

    ws.on("game-end", (winningPlayer: string, winningSymbol: string) => {
            toggleWinningScreen(winningPlayer, winningSymbol)
        }
    )
}