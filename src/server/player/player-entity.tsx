import { Janitor } from "@rbxts/janitor";
import Vide from "@rbxts/vide";
import Tree from "shared/packages/tree";
import { Nametag } from "shared/ui/components/nametag";

export default class PlayerEntity {
	private readonly janitor = new Janitor();

	public root: BasePart;
	public model: Model;
	public name: string;

	constructor(player: Player) {
		const { Name, Character } = player;
		if (Character) {
			this.model = Character;
		} else {
			this.model = player.CharacterAdded.Wait()[0];
		}

		this.name = Name;
		this.root = Tree.Await(this.model, "HumanoidRootPart") as BasePart;
	}

	private createNametag() {
		this.janitor.Add(
			Vide.mount(() => <Nametag adornee={this.root} name="test-name" level={0}></Nametag>, this.root),
		);
	}
}
