// @ts-ignore
const ws = io('http://localhost:8000')

function joinRandomGame()
{
    ws.emit('tryRandomJoin');
    console.log('called random join')
}