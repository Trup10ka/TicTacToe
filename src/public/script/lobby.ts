    const gameIdField = document.getElementById('game-id-input')! as HTMLInputElement;

    function joinRandomGame()
    {
        throw new Error("Not implemented")
    }
    function createNewGame()
    {
        window.location.href = "/create";
    }

    async function tryToConnect()
    {
        const gameId = gameIdField.value

        if (gameId.length == 0)
            return

        const response = await fetch('/join?id=' + gameId)

        if (response.ok)
            window.location.href = "/game?id=" + gameId
        else
            alert("Invalid game ID")
    }

