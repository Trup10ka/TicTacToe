import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { Session } from "./tictactoe/data/session"
import { generateGameId, initializeEmptyPlayground, processPlaceTileRequest } from "./util/util"
import { GameData } from "./tictactoe/data/game-data"
import { Player } from "./tictactoe/data/player"
import { Symbol } from "./tictactoe/data/symbol"
import { SessionState } from "./tictactoe/data/session-state"
import { Logger } from "./util/logger";
import { CLIClient } from "./cli/cli-client";

const port = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)
const io = new Server()

const activeGames: Map<string, Session> = new Map()

export const logger = new Logger()

configureApp(app)
configureRouting(app)
configureWebsocketServer(io)
startServer(server)
startCLI()

function startCLI()
{
    CLIClient
        .initialize(activeGames)
        .configureReaderListener()
    logger.log("CLI online, listening for commands")
}

function startServer(server: http.Server)
{
    server.listen(port, () => {
            logger.log(`Server is listening on port ${port}`)
        }
    )
}

function configureWebsocketServer(ioSocket: Server)
{
    logger.log("Configuring websocket server...")
    ioSocket.attach(server)
    logger.log("Websocket server has been attached to HTTP server")

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
    logger.log("Websocket server has been configured")
}
function configureApp(appInstance: express.Express)
{
    logger.log("Configuring app...")
    appInstance.use(express.static('dist/public'))
    appInstance.use(express.json())
    logger.log("App has been configured")
}

function configureRouting(appInstance: express.Express)
{
    logger.log("Configuring routing...")
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

    appInstance.get('/join', (req, res) => {
            const gameId = req.query.id!.toString()
            if (!activeGames.has(gameId))
            {
                logger.warn("Game not found")
                res.sendStatus(464)
                return;
            }
            res.append('gameId', gameId)
            res.end()
        }
    )

    appInstance.post('/create-session', (req, res) => {
            const gameData = GameData.fromJSON(req.body) // TODO: Validate data, make it typed
            const session = createSession(gameData)
            res.append('gameId', session.id)
            res.end()
        }
    )
    logger.log("Routing has been configured")
}
export function createSession(gameData: GameData) : Session
{
    const gameId = generateGameId()
    logger.log("Creating session with game id: " + gameId)
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