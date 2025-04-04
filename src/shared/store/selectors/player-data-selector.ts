import Object from "@rbxts/object-utils";
import { SharedState } from "..";

export const selectPlayerHealth = (player: string) => {
	return (state: SharedState) => state.player[player].health;
};

export const selectAllPlayerData = (state: SharedState) => Object.entries(state.player);

export const selectPlayerSession = (player: string) => {
	return (state: SharedState) => state.player[player].session!;
};
