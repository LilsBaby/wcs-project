import planck, { Phase, Pipeline, Scheduler } from "@rbxts/planck";
import world from "./world";
import jabby from "@rbxts/jabby";
import PlankJabbyPlugin from "@rbxts/planck-jabby";
import { Players, RunService } from "@rbxts/services";  

const playerAdded = new Phase()

const jabbyPlugin = new PlankJabbyPlugin()
const scheduler = new Scheduler(world).addPlugin(jabbyPlugin)

export = scheduler