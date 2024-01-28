import { Command } from "./command";

export class HelpCommand extends Command {
    constructor() {
        super("help", "help [command]", ["?", "h"])
    }
    execute() {
        console.log("Help command executed")
    }
    getDescription() {
        return "Prints help message"
    }
}