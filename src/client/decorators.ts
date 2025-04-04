import { Flamework, Modding } from "@flamework/core";
import { callMethodOnDependencies } from "@rbxts/flamework-meta-utils";
import { BaseAction, InputManager, RawInput, StandardActionBuilder } from "@rbxts/mechanism";
import { getRawInput, getRawInputFromEnum } from "@rbxts/mechanism/out/common";
import { BaseStandardAction } from "@rbxts/mechanism/out/standard-action";
import Object from "@rbxts/object-utils";
import { t } from "@rbxts/t";
import { Message, MessageData, Messaging } from "shared/message";
import { MovementDirection } from "shared/structs/movement";
import { clientState, RootState } from "./store";

const inputManager = new InputManager();

interface KeyboardAction<
	T extends "Begin" | "End" = "Begin" | "End",
	K extends string | StandardActionBuilder = string | StandardActionBuilder,
> {
	Input: K | K[];
	State: T;
}

/** @metadata reflect identifier*/
export function OnKeyboard<T extends KeyboardAction>(Action: T) {
	return (
		ctor: object,
		propertyKey: string,
		descriptor: TypedPropertyDescriptor<(this: unknown, action: string) => void>,
	) => {
		if (Action.State !== "Begin" && Action.State !== "End") return;

		const { Input, State } = Action;
		const Constructor = <Record<string, thread>>ctor;

		if (typeIs(Input, "string")) {
			const action = new StandardActionBuilder(Input as RawInput);
			inputManager.bind(action);
			State === "Begin"
				? action.activated.Connect(() => {
						task.spawn(Constructor[propertyKey], Input);
				  })
				: action.deactivated.Connect(() => task.spawn(Constructor[propertyKey], Input));
		} else if (Input instanceof StandardActionBuilder) {
			inputManager.bind(Input);
			State === "Begin"
				? Input.activated.Connect(() => {
						task.spawn(Constructor[propertyKey], Input.rawInputs[0]);
				  })
				: Input.deactivated.Connect(() => task.spawn(Constructor[propertyKey], Input.rawInputs[0]));
		} else {
			const Action = Input.map((v) => (typeIs(v, "string") ? new StandardActionBuilder(v as RawInput) : v));
			Action.forEach((b) => {
				inputManager.bind(b);
				State === "Begin"
					? b.activated.Connect(() => {
							task.spawn(Constructor[propertyKey], b.rawInputs[0]);
					  })
					: b.deactivated.Connect(() => task.spawn(Constructor[propertyKey], b.rawInputs[0]));
			});
		}
	};
}

export function Subscribe<T extends object, K = void>(
	state: T & {
		subscribe: (
			s: (t: RootState) => K,
			predicate: (current: K, previous: K) => boolean,
			callback: (s: K) => void,
		) => K;
	},
	selector: (t: RootState) => K,
	predicate?: (current: K, previous: K) => boolean,
) {
	return (
		ctor: object,
		propertyKey: string,
		descriptor: TypedPropertyDescriptor<(this: unknown, data: K) => void>,
	) => {
		const Constructor = <Record<string, thread>>ctor;

		state.subscribe(selector, predicate !== undefined ? predicate : () => true, (s: K) => {
			task.spawn(Constructor[propertyKey], s);
		});
	};
}

/** @metadata reflect identifier*/
export function OnMessage<Kind extends Message>(message: Kind) {
	return (
		ctor: object,
		propertyKey: string,
		descriptor: TypedPropertyDescriptor<(this: unknown, data: MessageData[Kind]) => void>,
	) => {
		Messaging.onClientMessage(message, (data) => callMethodOnDependencies(ctor, descriptor, data));
	};
}
