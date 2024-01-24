const url = new URL(window.location.href);
const playgroundGrid = document.getElementById("playground-grid") as HTMLDivElement;
const gameId = url.searchParams.get("id")!
// @ts-ignore
let ws: io.Socket
let playgroundDivArray: HTMLDivElement[][]

establishWebSocketConnection()
preparePlayground()
function establishWebSocketConnection()
{
    // @ts-ignore
    ws = new io("http://localhost:8000")

    configureWebsocket(ws)

    ws.emit("find-room", gameId)
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
            ws.emit("join-room", { gameId: gameId } )
        }
    )
    ws.on("room-not-found", () => {
            // TODO: Implement error HTML page
        }
    )
    ws.on("game-data", (playground: number[][]) => {
            loadGrid(playground)
            // TODO: Load currently playing player
        }
    )
}