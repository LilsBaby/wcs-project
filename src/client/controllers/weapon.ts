import { Controller, OnInit, OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { InputManager, RawInput, StandardActionBuilder } from "@rbxts/mechanism";
import Object from "@rbxts/object-utils";
import { ReplicatedStorage } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Signal } from "@rbxts/ui-labs/src/Libraries/Signal";
import { AnySkill, Character, Moveset, Skill } from "@rbxts/wcs";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { AudioController } from "client/audio/audio-controller";
import { LocalPlayer, USER_BODY, USER_NAME } from "client/constants";
import { OnKeyboard, Subscribe } from "client/decorators";
import { clientState } from "client/store";
import { selectHotbarActiveItem } from "client/store/hotbars/hotbar-selector";
import { defaultHotbarItem, HotbarItem } from "client/store/hotbars/hotbar-slice";
import { Message, Messaging } from "shared/message";
import Tree from "shared/packages/tree";
import { selectInventoryByPlayer } from "shared/store/selectors/inventory";
import { selectPlayerHealth } from "shared/store/selectors/player-data-selector";
import { InventoryItem } from "shared/store/slices/inventory";
import { WeaponAction } from "shared/structs/weapons";
import { Stun } from "shared/wcs/status-effects/Stun";
import { SoundEffects } from "types/enum/sounds";
import { Maybe } from "types/global";

interface InputBulder {
	actionName: string;
	actionBuilder: StandardActionBuilder;
}

@Controller({})
export class WeaponController implements OnInit {
	public readonly WeaponJanitor: Janitor = new Janitor();

	/** WCS_Character for applying skills and movesets */
	public WCS_Character: Maybe<Character>;

	/** To keep track of current weapon */
	public CurrentWeapon: Maybe<HotbarItem>;

	/** @ignore */
	constructor(private readonly audioController: AudioController) {
		if (!this.WCS_Character) {
			this.WCS_Character = Character.GetCharacterFromInstance(USER_BODY);
		}
	}

	onInit(): void | Promise<void> {
		this.WeaponJanitor.Add(
			LocalPlayer.CharacterAdded.Connect(() => {
				this.WCS_Character = Character.GetCharacterFromInstance(USER_BODY);
			}),
		);

		this.WeaponJanitor.Add(() => (this.WCS_Character = undefined));
	}

	@OnKeyboard({ Input: ["MouseButton1", "MouseButton2"], State: "Begin" })
	/**
	 * `onEnable`
	 * Essentially enables keybinds binded to weapons
	 * I.e. Playre presses M1 -> Start Skill
	 *
	 * @param Action - Input Action (M1, M2, M3)
	 * @returns void
	 */
	private onEnable(Action: string): void {
		if (this.CurrentWeapon === undefined) return;
		print(Action + ` On ${this.CurrentWeapon.id}`);

		switch (Action) {
			// universal attack on every weapon...
			case WeaponAction.Attack:
				break;
			default:
				break;
		}
	}

	@Subscribe(clientState, selectHotbarActiveItem())
	/**
	 * `HotbarItemChanged`
	 * Subscribes whenever the htobar item is active -> equips
	 *
	 * @param item - HotbarItem
	 * @returns void
	 */
	private HotbarItemChanged(hotbarItem: HotbarItem): void {
		// register weapon and equip it on the server
		this.RegisterWeapon(hotbarItem);
		Messaging.emitServer(Message.Equip, hotbarItem.id);
	}

	@Subscribe(clientState, selectPlayerHealth(USER_NAME))
	/**
	 * `HotbarItemChanged`
	 * Subscribes whenever the htobar item is active -> equips
	 *
	 * @param item - HotbarItem
	 * @returns void
	 */
	private HealthChanged(health: number): void {
		health > 0
			? this.audioController.PlaySound(health <= 20 ? SoundEffects.LowHP : SoundEffects.DamageDealt)
			: this.Clear();
	}

	/**
	 * `RegiserWeapon`
	 * Registers the weapon as either skill / moveset
	 *
	 * @param weapon
	 */
	public RegisterWeapon(weapon: HotbarItem) {
		const { id: weaponID } = weapon;

		// Cant switch weapon while being stunned
		if (!this.WCS_Character?.HasStatusEffects(Stun)) return;
		// moveset already exists
		if (this.WCS_Character?.GetMovesetName() === weaponID) return;
		// skill set already exists
		if (this.WCS_Character.GetSkillFromString(weaponID)) return;

		// Every weapon must have inputs binded to activate the skills
		if (Object.keys(weapon.inputs).isEmpty()) return;

		const Skill = this.GetSkill(weaponID);
		const Moveset = this.GetMoveset(weaponID);

		this.CurrentWeapon = weapon;
		if (Skill) {
			new Skill(this.WCS_Character as never);
		} else if (Moveset) {
			this.WCS_Character?.ApplySkillsFromMoveset(Moveset);
		} else {
			throw `Failed to extract skill / moveset from ${weaponID}`;
		}
	}

	private Clear(): void {
		if (this.WCS_Character?.GetMoveset()) {
			this.WCS_Character?.ClearMoveset();
		}
		for (const skill of this.WCS_Character!.GetAllActiveSkills()) {
			skill.Stop();
		}
		this.WCS_Character = undefined;
		this.WeaponJanitor.Cleanup();
	}

	public GetSkill(skill: string): Maybe<Constructor<AnySkill>> {
		return Tree.Find(ReplicatedStorage, `TS/wcs/skills/${skill}`) as unknown as Constructor<AnySkill>;
	}
	public GetMoveset(moveset: string): Maybe<Moveset> {
		return Tree.Find(ReplicatedStorage, `TS/wcs/skills/${moveset}`) as unknown as Moveset;
	}

	public GetWeapon() {
		return this.CurrentWeapon;
	}
}
