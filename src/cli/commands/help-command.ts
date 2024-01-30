import { Command } from "./command";

export class HelpCommand extends Command
{
    private allCommands?: readonly Command[]
    constructor()
    {
        super("help", "help [command]", ["?", "h"])
    }
    public execute(args: string[])
    {
        console.log(`All commands:
        ${ this.allCommands?.map(
            command => `\n${command.name} - ${command.getDescription()} \n\tUsage: ${command.usage} | Options: ${command.options}`
            ).join('\n')}`
        )
    }
    public getDescription()
    {
        return "Prints out this help message and all valid commands with their specific usage and options"
    }
    public loadAllCommands(allCommands: readonly Command[])
    {
        this.allCommands = allCommands
    }
}