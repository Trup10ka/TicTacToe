import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { Session } from "./tictactoe/data/session"
import { generateGameId, initializeEmptyPlayground, processPlaceTileRequest } from "./util/util";
import { GameData } from "./tictactoe/data/gamedata";
import { Player } from "./tictactoe/data/player";
import { Symbol } from "./tictactoe/data/symbol";
import { SessionState } from "./tictactoe/data/sessionstate";

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
                    if (activeGames.has(gameId))
                        ioSocket.to(socket.id).emit('room-found')
                    // TODO: Game not found
                }
            )
            socket.on('join-room', (gameId) => {
                    const session = activeGames.get(gameId)!
                    session.addPlayer(new Player(socket))
                    socket.join(gameId)
                }
            )
            socket.on('get-game-data', (gameId) => {
                    const session = activeGames.get(gameId)!
                    ioSocket.to(socket.id).emit('game-data', session.playground)
                }
            )
            socket.on('place-symbol', (gameId, x, y) => {
                    const session = activeGames.get(gameId)!
                    const currentPlayer = session.currentPlayer!
                    const canPlaceTile = session.place(x, y, socket)

                    if (canPlaceTile == 0)
                        ioSocket.to(gameId).emit('symbol-placed', x, y, Symbol[currentPlayer.symbol!])
                    else
                        ioSocket.to(socket.id).emit('symbol-not-placed', processPlaceTileRequest(canPlaceTile))
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
            res.sendFile('views/lobby.html', { root: '.' } )
        }
    )

    appInstance.get('/create', (req, res) => {
            res.sendFile('views/gamecreate.html', { root: '.' } )
        }
    )
    appInstance.get('/game', (req, res) => {
            const gameId = req.query.id!.toString()
            // TODO: Handle joining to existing game
            res.sendFile('views/game.html', { root: '.' } )
        }
    )

    appInstance.post('/create-session', (req, res) => {
            const gameData = GameData.fromJSON(req.body) // TODO: Validate data, make it typed
            const session = createSession(gameData)
            res.sendFile('views/game.html', { root: '.' } )
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
        initializeEmptyPlayground(gameData.playground),
        SessionState.NOT_STARTED
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