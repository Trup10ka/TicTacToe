import { Server, Socket } from "socket.io";
import { GameMode } from "../gamemode/gamemode";
import {PlaceTileState} from "./placetilestate";

export class Session
{
    private players: Socket[] = []

    public currentPlayer?: Socket

    constructor(
        private io: Server,
        public id: string,
        public name: string,
        private password: string,
        public gameMode: GameMode,
        public playground: number[][],
    )
    {
    }

    public place(x: number, y: number, player: Socket) : number
    {
        if (this.playground[y][x] != 0)
            return PlaceTileState.ALREADY_PLACED
        else if (this.currentPlayer != player)
            return PlaceTileState.NOT_YOUR_TURN

        this.playground[y][x] = 1
        return PlaceTileState.SUCCESS
    }

    public addPlayer(player: Socket)
    {
        if (this.players.length == 0)
            this.currentPlayer = player

        if (this.players.length >= 2)
            this.players.push(player)
        else
            player.emit("room-is-full")
    }

}