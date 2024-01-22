import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { Session } from "./tictactoe/data/session"
import { generateGameId } from "./util/util";
import { ClassicGameMode } from "./tictactoe/gamemode/classicgamemode";
import { GameData } from "./tictactoe/data/gamedata";
import { PlaceTileState } from "./tictactoe/data/placetilestate";

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

            socket.on('find-room', (gameId) => {
                    if (activeGames.has(gameId.gameId))
                        ioSocket.to(socket.id).emit('room-found')
                }
            )
            socket.on('join-room', (gameId) => {
                    const session = activeGames.get(gameId.gameId)!
                    session.addPlayer(socket)
                    socket.join(gameId)
                }
            )
            socket.on('get-game-data', (gameId) => {
                    const session = activeGames.get(gameId.gameId)!
                    ioSocket.to(socket.id).emit('game-data', session.playground)
                }
            )
            socket.on('place-symbol', (gameId, x, y) => {
                    const session = activeGames.get(gameId.gameId)!
                    const canPlaceTile = session.place(x, y, socket)
                    if (canPlaceTile == 1)
                        ioSocket.to(socket.id).emit('symbol-placed')
                    else
                        ioSocket.to(socket.id).emit('symbol-not-placed', PlaceTileState[canPlaceTile])
                }
            )
        }
    )
}
function configureApp(appInstance: express.Express)
{
    appInstance.use(express.static('dist/public'))
    appInstance.use(express.json())
}

function configureRouting(appInstance: express.Express)
{
    appInstance.get('/', (req, res) => {
            res.sendFile('views/lobby.html', { root: '.' })
        }
    )

    appInstance.get('/create', (req, res) => {
            res.sendFile('views/gamecreate.html', { root: '.' })
        }
    )
    appInstance.get('/game', (req, res) => {
            const gameId = req.query.id!.toString()
            res.sendFile('views/game.html', { root: '.' })
        }
    )

    appInstance.post('/create-session', (req, res) => {
            const gameData = GameData.fromJSON(req.body) // TODO: Validate data, make it typed
            const session = createSession(gameData)
            res.sendFile('views/game.html', { root: '.' })
            res.append('gameId', session.id)
        }
    )
}
function createSession(gameData: GameData) : Session
{
    const gameId = generateGameId()
    const session = new Session(
        io,
        gameId,
        gameData.gameName,
        gameData.password,
        gameData.gameMode,
        new Array(gameData.playground).fill(new Array(gameData.playground).fill(0))
    )
    activeGames.set(gameId, session)

    return session
}

function randomJoin()
{
    console.log('randomJoin has been called')
}

function playerConnection(message: string)
{
    console.log(message)
}