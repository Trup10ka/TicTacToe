import express from 'express'
import http from 'http'
import socketIO, {Server} from 'socket.io'

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

io.on('connection', (socket) => {
        console.log('a user connected')
        socket.on('disconnect', () => {
                console.log('user disconnected')
            }
        )
        socket.on('tryRandomJoin', () => {
                console.log('tryRandomJoin has been called')
            }
        )
        socket.on('playerConnection', (message) => {
                console.log(message)
            }
        )
    }
)

server.listen(port, () => {
        console.log("Server is running on port: " + port)
    }
)