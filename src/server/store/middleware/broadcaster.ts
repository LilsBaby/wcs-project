import { createBroadcaster, ProducerMiddleware } from "@rbxts/reflex";
import { Players } from "@rbxts/services";
import { SerializedSharedState, SharedState, slices, stateSerDes } from "../../../shared/store";
import { Message, Messaging } from "shared/message";

export const ONCE_PER_MINUTE = 60;

export function broadcasterMiddleware(): ProducerMiddleware {
	const hydrated = new Set<number>();

	const broadcaster = createBroadcaster({
		beforeHydrate: beforeHydrate(hydrated),
		dispatch: (player, actions) => {
			print(actions)
			Messaging.emitClient(player, Message.Dispatch, actions)
		},
		hydrate: (player, state) => {
			print(state)
			Messaging.emitClient(player, Message.Hydrate, state as unknown as SerializedSharedState)
		},
		hydrateRate: ONCE_PER_MINUTE,
		producers: slices,
	});

	Messaging.onServerMessage(Message.Start, (player) => broadcaster.start(player))

	Players.PlayerRemoving.Connect((player) => {
		hydrated.delete(player.UserId);
	});

	return broadcaster.middleware;
}

function beforeHydrate(hydrated: Set<number>): (player: Player, state: SharedState) => SharedState {
	return (player: Player, state: SharedState) => {
		// The cast is necessary due to the typings of the reflex library.
		const serialized = stateSerDes.serialize(state) as unknown as SharedState;

		const isInitialHydrate = !hydrated.has(player.UserId);
		if (!isInitialHydrate) {
			return serialized;
		}

		hydrated.add(player.UserId);
		return serialized;
	};
}