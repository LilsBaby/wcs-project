import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class Stun extends StatusEffect {
    protected OnStartServer(): void {
        this.SetHumanoidData({ WalkSpeed: [13.5, "Set"] })
    }
}