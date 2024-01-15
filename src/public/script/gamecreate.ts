// @ts-ignore
const gameModeChoice = document.getElementById("dropdown-content-container")! as HTMLButtonElement;

function showGameModes()
{
    gameModeChoice.classList.toggle("show");
}

function gameCreate()
{
    ws.emit('gamecreate')
}