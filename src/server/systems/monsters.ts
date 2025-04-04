import { ChildOf, Entity, OnAdd, OnRemove, OnSet, pair } from "@rbxts/jecs";
import { useChange, useInterval, useMap, useMemo, useState, useTimeout } from "@rbxts/jecs-hooks";
import Object from "@rbxts/object-utils";
import Phase from "@rbxts/planck/out/Phase";
import { object } from "@rbxts/react/src/prop-types";
import { CollectionService, Lighting } from "@rbxts/services";
import { Health, Model, Monster, Name, Transform, SpawnLocation, State, LinearVelocity } from "shared/jecs/components";
import world from "shared/jecs/world";
import StringUtils from "shared/packages/string";
import { Message, Messaging } from "shared/message";
import { getModelForMonster } from "shared/utils/monsters-utils";
import { getDistanceBetweenVectors } from "shared/utils/physics-utils";
import { MonsterState, MonsterStates } from "types/enum/states";
import Make from "@rbxts/make";

const TEST_MONSTER_NAME = "Golem";

const MIN_MONSTER_SPAWN_CLOCKTIME = 6.7;
const MAX_MONSTER_SPAWN_CLOCKTIME = 23.6;
//---------------------------------------
const MONSTER_CHASING_RANGER = 150;
//const MONSTER_SPAWN_THROTTLE = useInterval(10);

// just caching any entity with a model character and position that isnt a monster.
const ActivePlayers = world.query(Model, Transform, Health, State).without(Monster).cached().iter();
const ActiveMonsters = world.query(Model, Transform, Health, State, Monster).cached();
// -------------------------------------------------------------------------------------
const SpawnLocations = world.query(SpawnLocation).cached();

function MonsterSystem() {
	
}

function IsNightTime() {
	return Lighting.ClockTime >= MIN_MONSTER_SPAWN_CLOCKTIME && Lighting.ClockTime <= MAX_MONSTER_SPAWN_CLOCKTIME;
}

export = {
	name: "MonsterSystem",
	system: MonsterSystem,
	phase: Phase.PostUpdate,
	runCondition: { IsNightTime },
};
