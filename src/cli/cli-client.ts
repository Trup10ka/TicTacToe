import { createInterface, Interface } from "readline";
import {logger} from "../app";

export class CLIClient
{
    private reader: Interface

    private constructor(reader: Interface)
    {
        this.reader = reader
    }

    public static initialize(): CLIClient
    {
        const reader = createInterface(process.stdin, process.stdout)

        if (reader === null) logger.error("Failed to create reader")

        return new CLIClient(reader)
    }

    public configureReaderListener()
    {
        this.reader.on('line', (line) => {
                console.log(`Received line`)
            }
        )
    }
}