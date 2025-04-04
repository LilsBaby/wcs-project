import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { CombineStates } from "@rbxts/reflex";
import { inventorySlice } from "./slices/inventory";
import { playerSlice } from "./slices/player-data";
import { queueSlice } from "./slices/queue";

export type SharedState = CombineStates<typeof slices>;
export type SerializedSharedState = ReturnType<typeof stateSerDes.serialize>;

export const stateSerDes = createBinarySerializer<SharedState>()

export const slices = {
    queue: queueSlice,
    player: playerSlice,
    inventory: inventorySlice
}