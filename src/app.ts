import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { Game } from "./tictactoe/data/game"
import { utils } from "./util/util";

const port = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)
const io = new Server()

const activeGames: Array<Game> = []

configureApp(app)
configureRouting(app)
configureWebsocketServer(io)
startServer(server)

function startServer(server: http.Server)
{
    server.listen(port, () => {
            console.log("Server is running on port: " + port)
        }
    )
}

function configureWebsocketServer(ioSocket: Server)
{
    ioSocket.attach(server)

    ioSocket.on('connection', (socket) => {

            socket.on('createGame', () => createGame(socket))

            socket.on('tryRandomJoin', randomJoin)

            socket.on('playerConnection', playerConnection)
        }
    )

}
function configureApp(appInstance: express.Express)
{
    appInstance.use(express.static('dist/public'))
}

function configureRouting(appInstance: express.Express) {
    appInstance.get('/', (req, res) => {
            res.sendFile('views/lobby.html', {root: '.'})
        }
    )

    appInstance.get('/create', (req, res) => {
            res.sendFile('views/gamecreate.html', {root: '.'})
        }
    )

    appInstance.get('/game3x3', (req, res) => {
            res.sendFile('views/game3x3.html', {root: '.'})
        }
    )
}
function createGame(socket: Socket)
{
    const gameId = utils.generateGameId()
    const game = new Game('test', io)

    socket.join(gameId.toString())

    game.addPlayer(socket)

    activeGames[gameId] = game

    io.to(gameId.toString()).emit('GameCreated', gameId)
}

function randomJoin()
{
    console.log('randomJoin has been called')
}

function playerConnection(message: string)
{
    console.log(message)
}