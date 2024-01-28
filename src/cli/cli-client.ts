import { createInterface, Interface } from "readline";
import { logger } from "../app";
import { Command } from "./commands/command";
import { HelpCommand } from "./commands/help-command";
import { ShutdownCommand } from "./commands/shutdown-command";
export class CLIClient
{

    private reader: Interface

    private commandMap: Map<string[], Command> = new Map()

    private constructor(reader: Interface)
    {
        this.reader = reader
        this.initializeCommands()
    }

    public static initialize(): CLIClient
    {
        const reader = createInterface(process.stdin, process.stdout)

        if (reader === null) logger.error("Failed to create reader")

        return new CLIClient(reader)
    }

    public configureReaderListener()
    {
        this.reader.on('line', (line) => {
                console.log(`Received line`)
            }
        )
    }

    private initializeCommands()
    {
        const commands: Command[] = [
            new HelpCommand(), new ShutdownCommand()
        ]
        commands.forEach(command => {
                this.commandMap.set(command.options, command)
            }
        )
    }
}