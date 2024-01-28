import { createInterface, Interface } from "readline";
import { logger } from "../app";
import { Command } from "./commands/command";
import { HelpCommand } from "./commands/help-command";
import { ShutdownCommand } from "./commands/shutdown-command";
import { immutableCopyOf } from "../util/util";
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
                const commandLine = line.split(' ')
                const command = this.findCommand(commandLine[0])
                if (command === null)
                {
                    logger.error(`Command "${commandLine}" is not recognized`)
                    return
                }
                command.execute(commandLine.slice(1))
            }
        )
    }

    private initializeCommands()
    {
        const commands: Command[] = [
            new HelpCommand(), new ShutdownCommand()
        ]
        commands.forEach(command => {
                const commandCallArray = (commandName: string, options: string[]): string[] => { return [commandName, ...options] }
                this.commandMap.set(commandCallArray(command.name, command.options), command)
            }
        )
        const helpCommand = this.findCommand("help") as HelpCommand
        helpCommand.loadAllCommands(immutableCopyOf(commands))
    }

    private findCommand(command: string): Command | null
    {
        let foundCommand: Command | null = null
        this.commandMap.forEach((value, key) => {
                if (key.includes(command))
                {
                    foundCommand = value
                    return
                }
            }
        )
        return foundCommand
    }
}