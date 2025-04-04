import Object from "@rbxts/object-utils"
import { ReplicatedStorage } from "@rbxts/services"
import Tree from "shared/packages/tree"

const monstersModelMaps = new Map<string, Model>()

for (const model of ReplicatedStorage.Assets.Monsters.GetChildren()) {
    monstersModelMaps.set(model.Name, model as Model)
}

export function getModelForMonster(monsterName: string) {
    return monstersModelMaps.get(monsterName)
}

export function getAllMonsterModels(): Array<Model> {
    return Object.values(monstersModelMaps)
}