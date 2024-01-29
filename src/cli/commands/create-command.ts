import { Command } from "./command";
import {createSession, logger} from "../../app";
import { Session } from "../../tictactoe/data/session";
import { getCommandArgumentPair } from "../../util/util";
import {GameData} from "../../tictactoe/data/game-data";

export class CreateCommand extends Command
{
    constructor(
        private activeGames: Map<string, Session>
    )
    {
        super("create", "create [game-size] [game-mode] [name] [password]", ["c"]);
    }
    public execute(args: string[])
    {
        const parsedArgs = this.parseArguments(args)
        if (!this.areParsedArgumentsValid(parsedArgs)) return
        if (!this.checkForMandatoryArgs(parsedArgs!)) return

        const session = createSession(
            GameData.fromJSON(
                {
                    gameName: parsedArgs.get("n") ?? "Unnamed game",
                    password: parsedArgs.get("p") ?? "",
                    gameMode: parsedArgs.get("gm")!,
                    gameSize: parseInt(parsedArgs.get("gs")!)
                }
            )
        )
    }
    public getDescription()
    {
        return "Creates a new game with provided arguments. Game must be specified with game mode and game size, rest is optional";
    }

    private parseArguments(args: string[]): Map<string, string>
    {
        const argumentMap: Map<string, string> = new Map()
        for (let i = 0; i < args.length; i += 2)
        {
            const pair = getCommandArgumentPair(args, i)
            if (pair === null)
                continue
            argumentMap.set(pair.argument, pair.value)
        }

        return argumentMap
    }

    private checkForMandatoryArgs(map: Map<string, string>): boolean
    {
        if (map.has("gm") && map.has("gs"))
            return true
        logger.error("Missing mandatory arguments - game mode or game size")
        return false
    }

    private areParsedArgumentsValid(map: Map<string, string>): boolean
    {
        let areValid = true
        map!.forEach((value, key) => {
                if (value === "")
                {
                    areValid = false
                    logger.error(`Argument ${key} is missing a value`)
                }
            }
        )
        return areValid
    }
}