import { Controller, OnPhysics, OnStart } from "@flamework/core";
import { RawInput, StandardActionBuilder } from "@rbxts/mechanism";
import { Keyboard } from "client/classes/keyboard";
import { OnKeyboard } from "client/decorators";
import { MovingDirection } from "shared/structs/character";
import { MovementDirection } from "shared/structs/movement";

@Controller({})
export default class Movement implements OnPhysics {
	private positionalInput: 1 | -1 | 0 = 0;
	private turningInput: 1 | -1 | 0 = 0;

	private readonly activeInputs = new Map<string, boolean>([]);

	public onPhysics(dt: number): void {
		if (!this.getMovingDirection()) return;
	}

	/** @hidden */
	@OnKeyboard({
		Input: ["W", "A", "S", "D"],
		State: "Begin",
	})
	private async Enter(Action: string) {
		this.positionalInput = Action === MovementDirection.Forward ? 1 : 0;
		this.turningInput = Action === MovementDirection.Right ? 1 : 0;

		this.activeInputs.clear();
		this.activeInputs.set(Action, true);
	}

	/** @hidden */
	@OnKeyboard({
		Input: ["W", "A", "S", "D"],
		State: "End",
	})
	private async Leave(Action: string) {
		this.positionalInput = 0;
		this.turningInput = 0;

		this.activeInputs.has(Action) && this.activeInputs.set(Action, false);
	}

	public getMovingDirection(): ValueOf<typeof MovingDirection> | undefined {
		const positionlInput = this.positionalInput;
		const turningInput = this.turningInput;

		if (this.positionalInput !== 0)
			if (positionlInput > 0) {
				return MovingDirection.Forward;
			} else return MovingDirection.Backward;
		else if (this.turningInput !== 0)
			if (turningInput > 0) {
				return MovingDirection.Right;
			} else return MovingDirection.Left;

		return;
	}
}
