import { callMethodOnDependencies } from "@rbxts/flamework-meta-utils";
import { Message, MessageData, Messaging } from "shared/message";
import withPlayerEntity from "./player/with-player-entity";
import PlayerEntity from "./player/player-entity";

/** @metadata reflect identifier*/
export function OnMessage<Kind extends Message>(message: Kind) {
	return (
		ctor: object,
		propertyKey: string,
		descriptor: TypedPropertyDescriptor<
			(this: unknown, player: PlayerEntity, data: MessageData[Kind]) => Promise<void> | void
		>,
	) => {
		Messaging.onServerMessage(message, (player, data) => {
			return withPlayerEntity((entity, data: MessageData[Kind]) =>
				callMethodOnDependencies(ctor, descriptor, entity, data),
			);
		});
	};
}
