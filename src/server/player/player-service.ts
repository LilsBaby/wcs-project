import { Service, OnStart, OnInit, Modding } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Signal } from "@rbxts/ui-labs/src/Libraries/Signal";
import { serverState } from "server/store";
import { selectInventoryByPlayer } from "shared/store/selectors/inventory";
import { OnPlayerJoin } from "./player-hooks";
import { Janitor } from "@rbxts/janitor";
import Vide from "@rbxts/vide";
import { Nametag } from "shared/ui/components/nametag";
import { Instance } from "@rbxts/jabby/out/t";
import { getInstanceAtPath } from "@rbxts/flamework-meta-utils";
import Tree from "shared/packages/tree";
import PlayerEntity from "./player-entity";

@Service({})
export class PlayerService implements OnPlayerJoin {
	private readonly janitor = new Janitor();

	private readonly entities = new Map<string, PlayerEntity>()

	onPlayerJoin(player: Player): void {
		const character = player.CharacterAdded.Wait()[0];
		const rootPart = Tree.Find(character, "HumanoidRootPart");
		
		const entity = new PlayerEntity(player)
		this.entities.set(player.Name, entity)
	}

	public async GetEntity({ Name }: Player) {
		return this.entities.get(Name)
	}
}
