import { SharedState } from ".."

export const selectInventoryByPlayer = (player: string) => {
    return (state: SharedState) => state.inventory[player]
}