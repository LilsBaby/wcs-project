import { createProducer } from "@rbxts/reflex";
import { defaultInventoryItem, InventoryItem } from "shared/store/slices/inventory";
import Object from "@rbxts/object-utils";
import { RawInput } from "@rbxts/mechanism";
import { getRawInput } from "@rbxts/mechanism/out/common";

export interface HotbarItem extends InventoryItem {
	inputs: Record<string, RawInput>
	active: boolean,
}

export const defaultHotbarItem: HotbarItem = {
	id: "",
	size: 1,
	slot: 0,
	active: false,
	inputs: {}
}

export type hotbarKey = "One" | "Two" | "Three" | "Four" | "Five";
type HotbarsState = {
	readonly [K in hotbarKey]?: HotbarItem;
};

const initialState: HotbarsState = {};

export const hotbarsSlice = createProducer(initialState, {
	/** @ignore */
	loadHotbars: (state, hotbar: hotbarKey) => {
		return {
			...state,
			[hotbar]: {},
		};
	},

	/**
	 * `setHotbarItem`
	 *
	 * @param state
	 * @param hotbar
	 * @param item
	 * @returns state - Either modfied or original state
	 */
	setHotbarItem: (state, hotbar: hotbarKey, item: Partial<HotbarItem>) => {
		if (!state[hotbar]) {
			return state;
		}

		return {
			...state,
			[hotbar]: {
			...state[hotbar],
				...defaultHotbarItem,
				...item,
				
			},
		};
	},
});
