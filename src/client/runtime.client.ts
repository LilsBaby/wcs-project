import { Flamework } from "@flamework/core";
import start from "shared/jecs/start";
import Tree from "shared/packages/tree";

Flamework.addPaths("src/client/controllers");
Flamework.ignite();

const systems = Tree.Find(script.Parent!, "controllers/systems")
start(systems.GetChildren())