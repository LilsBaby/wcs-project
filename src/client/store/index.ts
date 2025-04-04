import { combineProducers, InferState, loggerMiddleware } from "@rbxts/reflex";
import { slices } from "shared/store";
import { receiverMiddleware } from "./middleware/receiver";
import { $NODE_ENV } from "rbxts-transform-env";
import { hotbarsSlice } from "./hotbars/hotbar-slice";

export type RootStore = typeof clientState;
export type RootState = InferState<RootStore>;

export function createStore(): typeof store {
	const store = combineProducers({
		...slices,
		hotbars: hotbarsSlice
	});

	store.applyMiddleware(receiverMiddleware());

	// Log reflex actions only when verbose logging is enabled.
	if ($NODE_ENV === "development") {
		store.applyMiddleware(loggerMiddleware);
	}

	return store;
}

/**
 * The Reflex store for the application.
 *
 * @see https://littensy.github.io/reflex/
 */
export const clientState = createStore();