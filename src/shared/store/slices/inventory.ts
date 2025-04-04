import { createProducer } from "@rbxts/reflex";

export interface InventoryItem {
	id: string;
	image?: string;
	size: number;
	slot: number;
}

export const defaultInventoryItem: InventoryItem = {
	id: "",
	image: "",
	size: 0,
	slot: 0,
};

type InventoryStates = {
	readonly [K in string]: InventoryItem;
};

type InventoryState = Record<string, InventoryStates | undefined>;

const initialState: InventoryState = {};
export const inventorySlice = createProducer(initialState, {
	loadInventory: (state, id: string) => {
		return {
			...state,
			[id]: {},
		};
	},

	removeInventory: (state, player: string) => {
		return {
			...state,
			[player]: undefined,
		};
	},

	/**
	 * `giveItem`
	 * Gives the player the item
	 *
	 * @param state - Inventory state
	 * @param player - Player's inventory to be modified
	 * @param id - The given item id
	 * @param patch - Item's data
	 * @returns
	 */
	giveItem: (state, player: string, id: string, patch: Omit<Partial<InventoryItem>, "id">) => {
		const inventory = state[player];
		return {
			...state,
			[player]: {
				...inventory,
				[id]: {
					...defaultInventoryItem, 
					...patch,
					id
				}
			},
		};
	},
});
