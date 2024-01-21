const url = new URL(window.location.href);
const playgroundGrid = document.getElementById("playground-grid") as HTMLDivElement;
const gameId = url.searchParams.get("id")!

establishWebSocketConnection()
preparePlayground()
function establishWebSocketConnection()
{
    // @ts-ignore
    const ws = new io("http://localhost:8000")

    configureWebsocket(ws)

    ws.emit("find-room", { gameId: gameId } )

    ws.emit("get-game-data", { gameId: gameId } )
}

async function preparePlayground(): Promise<void>
{
    const responce = await fetch("/get-game-data?id=" + url.searchParams.get("id")!)

    if (responce.status != 200)
    {
        console.log("Error: " + responce.status)
        return
    }
    const gridSize = +responce.headers.get("gridSize")!;
    const playground = await responce.json() as number[][]

    for (let i = 0; i < gridSize * gridSize; i++)
    {
        const gameTileDiv = document.createElement("div");
        gameTileDiv.classList.add("game-tile");
        playgroundGrid.appendChild(gameTileDiv);
    }

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
    ws.on("game-data", (gameData: object) => {
            console.log(gameData)
        }
    )
}