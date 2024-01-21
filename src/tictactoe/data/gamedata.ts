import { GameMode } from "../gamemode/gamemode";

export class GameData
{
   constructor(
       public readonly gameMode: GameMode,
       public readonly gameName?: string,
       public readonly password?: string,
       public readonly playground?: number
   )
   {
   }
}