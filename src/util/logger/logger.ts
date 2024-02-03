import { date } from "../util";
import { Palette } from "./color/palette";

export class Logger
{
    private output: NodeJS.WriteStream = process.stdout

    public log(message: string)
    {
        this.output.write(`[${date()}] `)
        this.output.write(Palette.blue("INFO"))
        this.output.write(` - ${message}\n`)
    }
    public error(message: string)
    {
        this.output.write(`[${date()}] `)
        this.output.write(Palette.red("ERROR"))
        this.output.write(` - ${message}\n`)
    }
    public warn(message: string)
    {
        this.output.write(`[${date()}] `)
        this.output.write(Palette.yellow("WARNING"))
        this.output.write(` - ${message}\n`)
    }

    public success(message: string)
    {
        this.output.write(`[${date()}] `)
        this.output.write(Palette.green("SUCCESS"))
        this.output.write(` - ${message}\n`)
    }
}