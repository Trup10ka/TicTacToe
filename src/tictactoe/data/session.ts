import {Server, Socket} from "socket.io";

export class Session
{
    private players: Socket[] = []

    constructor(private id: string, private io: Server)
    {
    }

    public addPlayer(player: Socket)
    {
        this.players.push(player)
    }
}