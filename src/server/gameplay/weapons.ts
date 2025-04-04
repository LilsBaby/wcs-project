import { Service, OnStart } from "@flamework/core";
import { isEmpty } from "@rbxts/object-utils";
import { ReplicatedStorage } from "@rbxts/services";
import { AnySkill, Character, Moveset, UnknownSkill } from "@rbxts/wcs";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { OnMessage } from "server/decorators";
import PlayerEntity from "server/player/player-entity";
import { Message } from "shared/message";
import StringUtils from "shared/packages/string";
import Tree from "shared/packages/tree";
import { Maybe } from "types/global";

@Service({})
export class WeaponService {
	@OnMessage(Message.Equip)
	/**
	 * `Equip`
	 * Equips the weapon based on the weapon id - string
	 * Note: every weapon id has to be found in a list of movesets
	 *
	 * @param player - PlayerEntity
	 * @param WeaponID - string
	 * @return void
	 */
	private Equip(player: PlayerEntity, WeaponID: string) {
		const moveset = this.GetMoveset(WeaponID);
		if (moveset === undefined) {
			throw `Moveset does not exist for ${WeaponID}`;
			return;
		}

		const model = <Model>Tree.Find(ReplicatedStorage, `Assets/Weapons/${WeaponID}`).Clone()
	}

	public GetSkill(id: string): Maybe<UnknownSkill> {
		return this.GetSkills()?.find((v) => StringUtils.startsWith(v.GetName(), id));
	}

	public GetMoveset(id: string): Maybe<Moveset> {
		return this.GetMovesets()?.find((v) => StringUtils.startsWith(v.Name, id));
	}

	public GetSkills(): Maybe<UnknownSkill[]> {
		return (Tree.Find(ReplicatedStorage, `TS/wcs/movesets`) as Folder)
			.GetChildren()
			.map((v) => v as never as AnySkill);
	}

	public GetMovesets(): Maybe<Moveset[]> {
		return (Tree.Find(ReplicatedStorage, `TS/wcs/movesets`) as Folder)
			.GetChildren()
			.map((v) => v as never as Moveset);
	}
}
