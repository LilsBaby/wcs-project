import { Workspace } from "@rbxts/services";
import { Character, Message, Skill, SkillDecorator } from "@rbxts/wcs";
import { getDistanceBetweenVectors } from "shared/utils/physics-utils";

@SkillDecorator
export default class SwordAttack extends Skill {
	protected OnConstructServer(): void {}

	protected async OnStartServer(): Promise<void> {
		this.GetNearestBody()
			.then((body) => Character.GetCharacterFromInstance(body))
			.then((char) => !char?.GetAllActiveSkills().find((v) => v.GetName() === "Shield") && char)
			.then(async () => await this.playHitVFX())
	}

	private async GetNearestBody(): Promise<BasePart> {
		const origin = (this.Character.Instance as Model).GetPivot().Position;
		const overlapParams = new OverlapParams();
		const nearest = Workspace.GetPartBoundsInRadius(origin, 7.8, overlapParams);
		const nearestBody = nearest.reduce((current, closest) => {
			const currMagni = getDistanceBetweenVectors(current.Position, origin);
			const closestMagni = getDistanceBetweenVectors(closest.Position, origin);

			return currMagni < closestMagni ? current : closest;
		});

		return nearestBody;
	}

	@Message({
		Destination: "Client",
		Type: "Request",
	})
	protected async playHitVFX() {}
}
