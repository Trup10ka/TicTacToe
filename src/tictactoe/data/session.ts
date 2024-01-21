import { Server, Socket } from "socket.io";
import { GameMode } from "../gamemode/gamemode";

export class Session
{
    private players: Socket[] = []

    constructor(
        private io: Server,
        public id: string,
        public name: string,
        private password: string,
        public gameMode: GameMode,
        public playground: number[][]
    )
    {
    }

    public addPlayer(player: Socket)
    {
        if (this.players.length >= 2)
            this.players.push(player)
        else
            player.emit("room-is-full")
    }

}