import { GameMode } from "../gamemode/gamemode";
import { ClassicGamemode } from "../gamemode/classic-gamemode";
import { WarGamemode } from "../gamemode/war-gamemode";
import { JesterGamemode } from "../gamemode/jester-gamemode";
import { EternityGamemode } from "../gamemode/eternity-gamemode";
import { logger } from "../../app";

export class GameData
{
   constructor(
       public readonly gameMode: GameMode,
       public readonly gameName: string,
       public readonly password: string,
       public readonly playground: number
   )
   {
   }
    public static fromJSON(json: any) : GameData
    {
         return new GameData(
              this.determineGameMode(json.gameMode),
              json.gameName,
              json.password,
              json.gameSize
         )
    }

    private static determineGameMode(gameMode: string) : GameMode
    {
        switch (gameMode)
        {
            case "CLASSIC": return new ClassicGamemode()
            case "WAR": return new WarGamemode()
            case "JESTER": return new JesterGamemode()
            case "ETERNITY": return new EternityGamemode()
            default: {
                logger.error("Invalid game mode: " + gameMode)
                throw new Error();
            }
        }
    }
}