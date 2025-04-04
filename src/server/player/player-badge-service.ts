import { Service, OnStart, OnInit } from "@flamework/core";
import { BadgeID, Badges } from "types/enum/badges";
import { BadgeService } from "@rbxts/services";
import { OnPlayerJoin } from "./player-hooks";

@Service({})
export class PlayerBadgeService implements OnPlayerJoin {
	onInit(): void | Promise<void> {}

	onPlayerJoin(player: Player): Promise<void> | void {
		this.awardBadge(player, Badges.Welcome).catch((err) => {
			throw `Failed to award player badge: ${err}`
		})
	}

	public async awardBadge({ UserId }: Player, badgeId: BadgeID): Promise<void> {
		const [succ, awared] = pcall(() => BadgeService.AwardBadge(badgeId, UserId));
		if (!succ) {
			throw awared;
		}

		print(`Successly awared badge: ${badgeId} To ${UserId}`);
	}
}
