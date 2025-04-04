
import { MonsterId } from "types/enum/monster";
import world from "./world";
import { MonsterState } from "types/enum/states";

const components = {
    // monster
    Monster: world.component(),
    SpawnLocation: world.component<BasePart>(),
    LinearVelocity: world.component<LinearVelocity>(),
    State: world.component<MonsterState>(),

    // global
    Name: world.component<string | MonsterId>(),
    Transform: world.component<Vector3>(),
    Health: world.component<number>(),
    Model: world.component<Model>(),
}

export =  components