export abstract class Command
{
    protected constructor(
        public readonly name: string,
        public readonly usage: string,
        public readonly options: string[] = []
    )
    {}

    public abstract execute(args: string): void

    public abstract getDescription(): string
}