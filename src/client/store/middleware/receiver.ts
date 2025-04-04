import type { ProducerMiddleware } from "@rbxts/reflex";
import { createBroadcastReceiver } from "@rbxts/reflex";

import { $NODE_ENV } from "rbxts-transform-env";
import { Message, Messaging } from "shared/message";
import { stateSerDes } from "shared/store";

/**
 * A middleware that listens for actions dispatched from the server and
 * dispatches them to the client store.
 *
 * @returns The middleware function.
 */
export function receiverMiddleware(): ProducerMiddleware {
	// Storybook support
	if ($NODE_ENV === "development") {
		return () => (dispatch) => dispatch;
	}

	const receiver = createBroadcastReceiver({
		start: () => {
			print("started");
			Messaging.emitServer(Message.Start);
		},
	});

	Messaging.onClientMessage(Message.Dispatch, (actions) => receiver.dispatch(actions));
	Messaging.onClientMessage(Message.Hydrate, (state) =>
		receiver.hydrate(stateSerDes.deserialize(state.buffer, state.blobs)),
	);

	return receiver.middleware;
}
