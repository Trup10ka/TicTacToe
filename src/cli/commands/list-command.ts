import { Command } from "./command";
import { Session } from "../../tictactoe/data/session";
import { logger } from "../../app";
import { getCommandArgumentPair, immutableFrom } from "../../util/util";
import { SessionState } from "../../tictactoe/data/session-state";

export class ListCommand extends Command
{
    constructor(
        private readonly gamesMap: Map<string, Session>
    )
    {
        super("list", "list", ["ls"]);
    }

    public execute(args: string[])
    {
        if (args.length === 0)
        {
            this.printOutput(immutableFrom(this.gamesMap.values()))
            return
        }
        const specialIdentifier = getCommandArgumentPair(args, 0)
        if (specialIdentifier!.value === "")
        {
            logger.error("Provided argument is missing a value")
            return
        }
        const output = this.getSessionWithCondition(specialIdentifier!)
        this.printOutput(output)
    }

    public getDescription(): string
    {
        return "Lists all the current games in progress or idle ones. Can also list games by a specific user, specific game mode, or grid size."
    }

    private getSessionWithCondition(specialIdentifier: { argument: string, value: string }): Session[]
    {
        switch (specialIdentifier.argument)
        {
            case "gm":
                return immutableFrom(this.gamesMap.values()).filter(session => session.gameMode.getName() === specialIdentifier.value)
            case "gs":
                return immutableFrom(this.gamesMap.values()).filter(session => session.playground.length === parseInt(specialIdentifier.value))
            default:
            {
                logger.error("Provided argument is not recognized")
                return []
            }
        }
    }
    private printOutput(output: readonly Session[])
    {
        if (output.length === 0)
        {
            logger.warn("No games found")
            return
        }
        output.forEach((session, _) => {
                console.log(`Session ID | Session name: ${session.id} | ${session.name}
                 => Game mode: ${session.gameMode.getName()}, Grid size: ${session.playground.length}x${session.playground.length}, Session state: ${SessionState[session.sessionState]}`)
            }
        )
    }
}