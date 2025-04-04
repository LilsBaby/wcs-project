import { Flamework } from "@flamework/core";
import start from "shared/jecs/start";
import Tree from "shared/packages/tree";

Flamework.addPaths("src/server/player");
Flamework.addPaths("src/server/gameplay");
Flamework.ignite();
print("Flamework ignited [Server]")

const systems = Tree.Find(script.Parent!, "systems") 
print(systems, systems.GetChildren())
start(systems.GetChildren())