const gameModeChoice = document.getElementById("dropdown-content-container")! as HTMLButtonElement;

function showGameModes()
{
    gameModeChoice.classList.toggle("show");
}
function chooseGameMode(gameMode: string)
{
    const gameModeButton = document.getElementById("dropdown-content-button")! as HTMLButtonElement
    gameModeButton.innerText = gameMode
    showGameModes()
}

async function gameCreate() : Promise<void>
{
    const gameData = collectData()
    const response = await fetch("/create-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    gameName: gameData.gameName,
                    gameMode: gameData.gameMode,
                    gameSize: gameData.gameSize,
                    password: gameData.password
                }
            )
        }
    )
    const gameId = response.headers.get("gameId")!
    window.location.href = `/game?id=${gameId}`
}

function collectData() : { gameName: string, password: string, gameMode: string, gameSize: number }
{
    const gameName = document.getElementById("game-name-input")! as HTMLInputElement
    const password = document.getElementById("game-password-input")! as HTMLInputElement
    const gameMode = document.getElementById("dropdown-content-button")! as HTMLButtonElement
    const gameSize = queryGameSize(document.getElementById("game-size-form")! as HTMLFormElement)

    return { gameSize: gameSize, password: password.value, gameName: gameName.value, gameMode: gameMode.innerText.toUpperCase() }
}

function queryGameSize(form: HTMLFormElement) : number
{
    for (const element of form.elements)
    {
        if (element instanceof HTMLInputElement && element.checked)
            return parseInt((element.parentElement! as HTMLLabelElement).innerText.split("x")[0])
    }
    return -1
}