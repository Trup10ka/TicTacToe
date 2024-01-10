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
        res.render('login')
    }
)

io.on('playerConnection', (message, socket) => {
        console.log(message)
        console.log(socket)
    }
)

server.listen(port, () => {
        console.log("Server is running on port: " + port)
    }
)