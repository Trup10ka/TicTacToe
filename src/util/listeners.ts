export function onDisconnect()
{
    console.log('user disconnected')
}

export function randomJoin()
{
    console.log('randomJoin has been called')
}

export function playerConnection(message: string)
{
    console.log(message)
}

export * as listeners from './listeners'