import kleur from "kleur";
import { date } from "./util";

export class Logger
{
    private output: NodeJS.WriteStream = process.stdout

    public log(message: string)
    {
        this.output.write(`[${date()}] `)
        this.output.write(kleur.blue("INFO"))
        this.output.write(` - ${message}\n`)
    }
    public error(message: string)
    {
        this.output.write(`[${date()}] `)
        this.output.write(kleur.red("ERROR"))
        this.output.write(` - ${message}\n`)
    }
    public warn(message: string)
    {
        this.output.write(`[${date()}] `)
        this.output.write(kleur.yellow("WARNING"))
        this.output.write(` - ${message}\n`)
    }
}