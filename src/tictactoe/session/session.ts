import { Server, Socket } from "socket.io"
import { GameMode } from "../gamemode/gamemode"
import { PlaceTileResult } from "./place-tile-result"
import { Player } from "../data/player"
import { Symbol } from "../data/symbol"
import { SessionState } from "./session-state"
import {logger} from "../../app";

export class Session
{
    constructor(
        private io: Server,
        public id: string,
        public name: string,
        private password: string,
        public gameMode: GameMode,
        public playground: number[][],
        public sessionState: SessionState
    )
    {
    }

    private players: Player[] = []

    public currentPlayer?: Player

    public place(x: number, y: number, socket: Socket) : number
    {
        if (this.sessionState === SessionState.NOT_STARTED) return SessionState.NOT_STARTED
        else if (this.currentPlayer!.playerSocket.id !== socket.id) return PlaceTileResult.NOT_YOUR_TURN

        const canPlaceTile = this.gameMode.canPlaceTile(this.playground[x][y])

        if (canPlaceTile !== PlaceTileResult.SUCCESS)
            return canPlaceTile

        return this.placeTile(x, y, socket)
    }

    public addPlayer(player: Player)
    {
        if (this.players.length >= 2)
        {
            player.playerSocket.emit("room-is-full")
            return
        }
        if (this.players.length == 0)
        {
            player.symbol = Symbol.X
            this.currentPlayer = player
        }
        else
        {
            player.symbol = Symbol.O
            this.sessionState = SessionState.IN_PROGRESS
        }
        this.players.push(player)
    }

    public setPlayerName(socket: Socket, playerName: string)
    {
        const player = this.getPlayer(socket)
        if (!player)
        {
            logger.warn("Player tried to join into session where he doesn't possess a socket")
            return
        }
        player.name = playerName
        if (this.players.length === 2)
        {
            this.io.to(socket.id).emit('player-name-set', this.currentPlayer!.name, Symbol[this.currentPlayer!.symbol!])
            return
        }
        this.io.to(socket.id).emit('player-name-set', playerName, Symbol[player.symbol!])
    }

    public getPlayer(socket: Socket) : Player | undefined
    {
        return this.players.find(player => player.playerSocket.id === socket.id)
    }

    public getSessionSize() : number
    {
        return this.players.length
    }

    private placeTile(x: number, y: number, socket: Socket): PlaceTileResult
    {
        this.playground[x][y] = this.currentPlayer!.symbol!
        this.currentPlayer = this.players.find(player => player.playerSocket.id != socket.id)
        return PlaceTileResult.SUCCESS
    }
}