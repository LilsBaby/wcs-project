import { Dependency } from "@flamework/core";
import PlayerEntity from "./player-entity";
import { PlayerService } from "./player-service";

let playerService: PlayerService | undefined;

export default function withPlayerEntity<T extends Array<unknown>, R = void>(
    fn: (playerEntity: PlayerEntity, ...args: T) => R,
) {
    return (player: Player, ...args: T) => {

        if (!playerService) {
            playerService = Dependency<PlayerService>();
        }
        const entity = playerService.GetEntity(player).expect()
        
        if (entity) {
            return fn(entity, ...args);
        }
    };
}