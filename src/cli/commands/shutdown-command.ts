import { Command } from "./command";

export class ShutdownCommand extends Command
{
    constructor()
    {
        super("exit", "exit", ["quit", "shutdown", "shut"])
    }
    public execute(args: string[])
    {
        process.exit(0)
    }
    public getDescription()
    {
        return "Shuts down the server and exits the application"
    }
}