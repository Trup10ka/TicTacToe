import { Server, Socket } from "socket.io";
import { GameMode } from "../gamemode/gamemode";

export class Session
{
    private players: Socket[] = []

    constructor(public id: string, private io: Server, public gameMode: GameMode)
    {
    }

    public addPlayer(player: Socket)
    {
        this.players.push(player)
    }

}