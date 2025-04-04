import { t } from "@rbxts/t";

export declare enum SoundEffects {
	LowHP = 111,
	DamageDealt = 112,
}

export declare enum Music {
	Background = 113,
	Music1 = 114,
}

export type SoundID = ValueOf<typeof SoundEffects> | ValueOf<typeof Music>;
