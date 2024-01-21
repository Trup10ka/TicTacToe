const playgroundGrid = document.getElementById("playground-grid") as HTMLDivElement;

preparePlayground()

function preparePlayground()
{
    const gridSize = getSizeOfGridFromDocumentName();

    for (let i = 0; i < gridSize * gridSize; i++)
    {
        const gameTileDiv = document.createElement("div");
        gameTileDiv.classList.add("game-tile");
        playgroundGrid.appendChild(gameTileDiv);
    }
    console.log("done preparing playground")
}


function getSizeOfGridFromDocumentName(): number
{
    let path = window.location.pathname;

    return +path.split("/").pop()!.split('x')[1];
}