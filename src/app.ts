import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { Session } from "./tictactoe/data/session"
import { generateGameId } from "./util/util";
import { ClassicGameMode } from "./tictactoe/gamemode/classicgamemode";
import { GameData } from "./tictactoe/data/gamedata";

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
            res.sendFile('views/lobby.html', { root: '.' })
        }
    )

    appInstance.get('/create', (req, res) => {
            res.sendFile('views/gamecreate.html', { root: '.' })
        }
    )

    appInstance.get('/game', (req, res) => {
            res.sendFile('views/game3x3.html', { root: '.' })
        }
    )

    appInstance.post('/create-session', (req, res) => {
            const gameData = new GameData(new ClassicGameMode(), req.body.gameName, req.body.password)
            createSession(gameData)
            res.sendFile('views/game3x3.html', { root: '.' })
        }
    )
}
function createSession(gameData: GameData)
{
    const gameId = generateGameId()
    const session = new Session(gameId, io, new ClassicGameMode())

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