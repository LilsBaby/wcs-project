import { createProducer } from "@rbxts/reflex";
import { CreateMatchMakingTicketResult } from "types/interfaces/match-making";

const initialState: Record<string, CreateMatchMakingTicketResult> = {}
export const queueSlice = createProducer(initialState, {
    loadQueueTicket: (state, playerName: string, ticket: CreateMatchMakingTicketResult) => {
        return {
            ...state,
            [playerName]: ticket
        }
    }
})