import { createInterface, Interface } from "readline";
import { logger } from "../app";
import { Command } from "./commands/command";
import { HelpCommand } from "./commands/help-command";
import { ShutdownCommand } from "./commands/shutdown-command";
import { immutableCopyOf } from "../util/util";
import { Session } from "../tictactoe/data/session";
import { ListCommand } from "./commands/list-command";
import {CreateCommand} from "./commands/create-command";
export class CLIClient
{
    private reader: Interface

    private commandMap: Map<string[], Command> = new Map()

    private constructor(reader: Interface, gamesMap: Map<string, Session>)
    {
        this.reader = reader
        this.initializeCommands(gamesMap)
    }

    public static initialize(gamesMap: Map<string, Session>): CLIClient
    {
        const reader = createInterface(process.stdin, process.stdout)

        if (reader === null) logger.error("Failed to create reader")

        return new CLIClient(reader, gamesMap)
    }

    public configureReaderListener()
    {
        this.reader.on('line', (line) => {
                if (line === "") return
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

    private initializeCommands(gamesMap: Map<string, Session>)
    {
        const commands: Command[] = [
            new HelpCommand(), new ShutdownCommand(), new ListCommand(gamesMap), new CreateCommand()
        ]
        commands.forEach(command => {
                this.commandMap.set([command.name, ...command.options], command)
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