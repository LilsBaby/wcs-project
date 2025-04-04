import { createProducer } from "@rbxts/reflex";
import { LoginResult } from "types/interfaces/match-making/client";

interface PlayerTemplate {
	health: number;
	session: LoginResult | undefined
}

const defaultPlayerTemplate: PlayerTemplate = {
	health: 100,
	session: undefined
};

type PlayerState = Record<string, PlayerTemplate>;

const initialState: PlayerState = {};
export const playerSlice = createProducer(initialState, {
	loadPlayerData: (state, player: string, data: Partial<PlayerTemplate>) => {
		return {
			...state,
			[player]: {
				...defaultPlayerTemplate,
				...data,
			},
		};
	},

	setHealth: (state, player: string, health: number) => {
		const playerData = state[player];
		if (!playerData) {
			return state;
		}

		return {
			...state,
			[player]: {
				...playerData,
				health: math.clamp(health, 0, 150),
			},
		};
	},

	setSession: (state, player: string, session) => {
		const playerData = state[player];

		return {
			...state,
			[player]: playerData && {
				...playerData,
				session
			}
		}
	}
});
