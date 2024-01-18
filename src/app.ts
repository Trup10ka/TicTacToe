import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { Session } from "./tictactoe/data/session"
import { generateGameId } from "./util/util";

const port = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)
const io = new Server()

const activeGames: Map<string, Session> = new Map()

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

            socket.on('createGame', () => createSession(socket))

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

    appInstance.get('/game', (req, res) => {
            res.sendFile('views/game3x3.html', {root: '.'})
        }
    )
}
function createSession(socket: Socket)
{
    const gameId = generateGameId()
    const session = new Session(gameId, io)

    socket.join(gameId.toString())

    session.addPlayer(socket)

    activeGames.set(gameId, session)

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