import { Server, Socket } from "socket.io";
import { GameMode } from "../gamemode/gamemode";
import { PlaceTileEvent } from "./placetilestate";
import { Player } from "./player";
import { Symbol } from "./symbol";
import { SessionState } from "./sessionstate";

export class Session
{
    private players: Player[] = []

    public currentPlayer?: Player

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

    public place(x: number, y: number, socket: Socket) : number
    {
        if (this.sessionState == SessionState.NOT_STARTED) return SessionState.NOT_STARTED
        if (this.playground[x][y] != 0) return PlaceTileEvent.ALREADY_PLACED_TILE
        else if (this.currentPlayer!.playerSocket.id != socket.id) return PlaceTileEvent.NOT_YOUR_TURN

        this.playground[x][y] = this.currentPlayer!.symbol!
        this.currentPlayer = this.players.find(player => player.playerSocket.id != socket.id)
        return PlaceTileEvent.SUCCESS
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

    private placeTile(x: number, y: number, socket: Socket)
    {
        this.playground[x][y] = this.currentPlayer!.symbol!
        this.currentPlayer = this.players.find(player => player.playerSocket.id != socket.id)
        return
    }
}