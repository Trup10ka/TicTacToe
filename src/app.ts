import express from 'express'
import http from 'http'
import socketIO, {Server} from 'socket.io'
import { listeners } from "./util/listeners";

const port = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)
const io = new Server()

const playerDuos : Array<string[]> = []

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

        console.log('User ' + socket.client + ' connected')

        socket.on('disconnect', listeners.onDisconnect)

        socket.on('tryRandomJoin', listeners.randomJoin)

        socket.on('playerConnection', listeners.playerConnection)
    }
)

server.listen(port, () => {
        console.log("Server is running on port: " + port)
    }
)