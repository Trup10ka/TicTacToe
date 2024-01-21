import { GameMode } from "../gamemode/gamemode";
import { ClassicGameMode } from "../gamemode/classicgamemode";
import { WarGameMode } from "../gamemode/wargamemode";
import { JesterGameMode } from "../gamemode/jestergamemode";
import { EternityGameMode } from "../gamemode/eternitygamemode";

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
            case "CLASSIC": return new ClassicGameMode()
            case "WAR": return new WarGameMode()
            case "JESTER": return new JesterGameMode()
            case "ETERNITY": return new EternityGameMode()
            default: throw new Error("Invalid game mode")
        }
    }
}