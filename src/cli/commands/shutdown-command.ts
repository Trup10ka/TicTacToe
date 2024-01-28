import { Command } from "./command";

export class ShutdownCommand extends Command {
    constructor() {
        super("exit", "exit", ["quit", "shutdown", "shut"])
    }
    execute(args: string[]) {
        process.exit(0);
    }
    getDescription() {
        return "Exits the application";
    }
}