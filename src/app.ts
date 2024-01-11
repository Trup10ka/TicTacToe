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

io.attach(server)

app.set('view engine', 'ejs')

app.use(express.static('dist/public'))

app.get('/', (req, res) => {
        res.render('lobby')
    }
)

app.get('/create', (req, res) => {
        res.render('gamecreate')
    }
)

io.on('connection', (socket) => {

        socket.on('createGame', createGame)

        socket.on('tryRandomJoin', randomJoin)

        socket.on('playerConnection', playerConnection)
    }
)

server.listen(port, () => {
        console.log("Server is running on port: " + port)
    }
)

function createGame(socket: Socket)
{
    const gameId = utils.generateGameId()
    const game = new Game('test', io)

    game.addPlayer(socket)

    activeGames[gameId] = game
}

function randomJoin()
{
    console.log('randomJoin has been called')
}

function playerConnection(message: string)
{
    console.log(message)
}