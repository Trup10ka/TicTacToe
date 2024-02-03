import { Color } from "./color";

export class Palette
{
    public static yellow(text: string): string
    {
        return `${Color.YELLOW}${text}${Color.RESET}`
    }

    public static red(text: string): string
    {
        return `${Color.RED}${text}${Color.RESET}`
    }

    public static green(text: string): string
    {
        return `${Color.GREEN}${text}${Color.RESET}`
    }

    public static blue(text: string): string
    {
        return `${Color.BLUE}${text}${Color.RESET}`
    }
}