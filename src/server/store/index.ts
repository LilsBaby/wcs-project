import { combineProducers, InferState } from "@rbxts/reflex";
import { broadcasterMiddleware } from "./middleware/broadcaster";
import { $NODE_ENV } from "rbxts-transform-env";
import { slices } from "../../shared/store";
import { profilerMiddleware } from "../../shared/store/middleware/profiler";

export type RootState = InferState<typeof serverState>;

export function createStore() {
	const store = combineProducers({
		...slices,
	});

	store.applyMiddleware(broadcasterMiddleware());

	if ($NODE_ENV === "development") {
		store.applyMiddleware(profilerMiddleware)
	}

	return store;
}

export const serverState = createStore();