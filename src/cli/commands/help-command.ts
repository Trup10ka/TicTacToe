import { Command } from "./command";

export class HelpCommand extends Command {
    constructor() {
        super("help", "Prints help message", "help [command]")
    }
    execute() {
        console.log("Help command executed")
    }
    getDescription() {
        return "Prints help message"
    }
}