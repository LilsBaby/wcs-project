import Phase from "@rbxts/planck/out/Phase";
import { CollectionService } from "@rbxts/services";
import { SpawnLocation } from "shared/jecs/components";
import world from "shared/jecs/world";

function SpawnSystem() {
    for (const spawn of CollectionService.GetTagged("SpawnLocation")) {
		if (!spawn.IsA("BasePart")) return;
		
		const e = world.entity()
		world.set(e, SpawnLocation, spawn)
	}
}

export = {
	name: "SpawnSystem",
	system: SpawnSystem,
	phase: Phase.PostUpdate,
};
