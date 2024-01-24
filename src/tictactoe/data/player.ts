import { Socket } from "socket.io";
import { Symbol } from "./symbol";

export class Player
{
    constructor(
        public playerSocket: Socket,
        public symbol?: Symbol,
        public name?: string,
    )
    {
    }
}