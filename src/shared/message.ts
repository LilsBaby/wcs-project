import { BroadcastAction } from "@rbxts/reflex";
import { SerializedSharedState, SharedState } from "./store";
import { MessageEmitter } from "@rbxts/tether";
import { DataType } from "@rbxts/flamework-binary-serializer";
import { InventoryItem } from "./store/slices/inventory";
import { Id } from "@rbxts/jecs";

export const Messaging = MessageEmitter.create<MessageData>();

export const enum Message {
	//----- Server -> Client
	Dispatch,
	Hydrate,

	//----- Client -> Server
	Start,

	// weapons
	Equip,
	StartSkill,

	// queues
	JoinQueue,
}

export interface MessageData {
	[Message.Dispatch]: BroadcastAction[];
	[Message.Hydrate]: SerializedSharedState;
	[Message.Start]: void;
	[Message.Equip]: string,
	[Message.StartSkill]: DataType.u8
	[Message.JoinQueue]: void;
}
