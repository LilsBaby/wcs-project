import { Moveset } from "@rbxts/wcs";

interface ReplicatedStorage extends Instance {
	Assets: Folder & {
        Weapons: Folder & {
            Sword: Model & {
                AttachMotor6D: Motor6D
            }
        },
		Monsters: Folder & {
			Golem: Model;
		};
		Animations: Folder & {
			Monsters: Folder & {
				Golem: Folder & {
					Idle: Animation;
					Run: Animation;
					Attack_1: Animation;
				};
			};
		};
	};
}
