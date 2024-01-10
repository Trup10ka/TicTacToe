// @ts-ignore
const io = io('http://localhost:8000')

function enterInQueue()
{
    io.emit('playerConnection', 'Player connected to the server' + '');
}