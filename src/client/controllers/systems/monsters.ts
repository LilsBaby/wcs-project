import { OnAdd, OnSet } from "@rbxts/jecs";
import Phase from "@rbxts/planck/out/Phase";
import { Workspace } from "@rbxts/services";
import { logError } from "@rbxts/wcs/out/source/utility";
import { Health, Model, State, Transform } from "shared/jecs/components";
import { PositionRoute } from "shared/jecs/routes";
import world from "shared/jecs/world";
import { Message, Messaging } from "shared/message";

function MonsterSystem() {
	
}

export = {
	name: "MonsterSystem",
	system: MonsterSystem,
	phase: Phase.PostUpdate,
};
