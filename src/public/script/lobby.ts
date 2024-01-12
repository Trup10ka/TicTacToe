// @ts-ignore
const ws = io('http://localhost:8000')

configureSocket()
function joinRandomGame()
{

}
async function createNewGame() : Promise<void>
{
    const response = await fetch('/create')

    if (response.ok)
        window.location.href = response.url;
}

function tryToConnect()
{
    console.log('Not yet implemented')
}

function configureSocket()
{
    ws.on("GameCreated", (gameId: string) => {
            console.log(`Game created with id ${gameId}`)
        }
    )
}
