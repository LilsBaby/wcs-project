import Object from "@rbxts/object-utils";
import { RootState } from "..";
import { defaultHotbarItem } from "./hotbar-slice";

export function selectHotbarsItems() {
	return (state: RootState) => state.hotbars;
}

export function selectHotbarActiveItem() {
	return (state: RootState) => Object.values(state.hotbars).find((v) => v.active) ?? defaultHotbarItem;
}
