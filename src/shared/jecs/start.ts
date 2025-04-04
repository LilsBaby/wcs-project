import { SystemTable } from "@rbxts/planck/out/types";
import scheduler from "./scheduler";
import { ContextActionService, RunService } from "@rbxts/services";
import jabby from "@rbxts/jabby";
import world from "./world";
import { start } from "@rbxts/yetanothernet";
import { PositionRoute } from "./routes";

export = (systems: Instance[]) => {
	
	// start(world, { PositionRoute })
	const sysModules: ModuleScript[] = []

	systems.forEach((system) => {
		sysModules.push(require(system as ModuleScript) as ModuleScript)
	})

	if (sysModules.size() > 0) {
		scheduler.addSystems(sysModules as never);
	}

	if (RunService.IsClient()) {
		const client = jabby.obtain_client();

		const createWidget = (_: string, state: Enum.UserInputState) => {
			if (state !== Enum.UserInputState.Begin) {
				return;
			}

			client.spawn_app(client.apps.home);
		};

		ContextActionService.BindAction("Open Jabby", createWidget, false, Enum.KeyCode.F4);
	}

	jabby.register({
		applet: jabby.applets.world,
		name: "jecs world",
		configuration: {
			world,
		},
	});
};
