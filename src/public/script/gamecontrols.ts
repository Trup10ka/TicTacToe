const url = new URL(window.location.href);
const playgroundGrid = document.getElementById("playground-grid") as HTMLDivElement;
const gameId = url.searchParams.get("id")!
// @ts-ignore
let ws: io.Socket

establishWebSocketConnection()
preparePlayground()
function establishWebSocketConnection()
{
    // @ts-ignore
    ws = new io("http://localhost:8000")

    configureWebsocket(ws)

    ws.emit("find-room", { gameId: gameId } )
}

function preparePlayground()
{
    ws.emit("get-game-data", { gameId: gameId })
    ws.emit("playground-prepared", { gameId: gameId })
}

function loadGrid(playground: number[][])
{
    playgroundGrid.classList.add("size-" + playground.length.toString())
    for (let y = 0; y < playground.length; y++)
    {
        for (let i = 0; i < playground[y].length; i++)
        {
            const gameTileDiv = createTile(playground, y, i)
            playgroundGrid.appendChild(gameTileDiv)
        }
    }
}

function createTile(playground: number[][], y: number, i: number) : HTMLDivElement
{
    const gameTileDiv = document.createElement("div")
    gameTileDiv.classList.add("game-tile-" + playground.length)
    insertSymbol(gameTileDiv, playground[y][i])
    return gameTileDiv
}

function insertSymbol(tile: HTMLDivElement, symbol: number)
{
    if (symbol == 0)
        return
    else if (symbol == 1)
        tile.innerText = "X"
    else if (symbol == 2)
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