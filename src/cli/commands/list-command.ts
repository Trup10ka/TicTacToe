import { Command } from "./command";
import { Session } from "../../tictactoe/data/session";
import {logger} from "../../app";
import { immutableFrom } from "../../util/util";
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
        const specialIdentifier = args[0]
        const output = this.getSessionWithCondition(specialIdentifier)

        if (args[1] !== undefined)
            this.sortOutputBy(args[1], output)

        this.printOutput(output)
    }

    public getDescription(): string
    {
        return "Lists all the current games in progress or idle ones. Can also list games by a specific user, specific game mode, or grid size."
    }

    private getSessionWithCondition(specialIdentifier: string): Session[]
    {
        switch (specialIdentifier)
        {

        }
        return []
    }
    private sortOutputBy(by: string, output: Session[])
    {
        return []
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
                 => Game mode: ${session.gameMode}, Grid size: ${session.playground.length}x${session.playground.length}, Session state: ${SessionState[session.sessionState]}`)
            }
        )
    }
}