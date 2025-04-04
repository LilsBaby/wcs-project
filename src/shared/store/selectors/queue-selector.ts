import { SharedState } from ".."

export const selectQueueTicket = (playerName: string) => {
    return (state: SharedState) => state.queue[playerName]
}