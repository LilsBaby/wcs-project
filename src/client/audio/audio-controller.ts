import { Controller, OnInit, OnStart } from "@flamework/core";
import Make from "@rbxts/make";
import Object from "@rbxts/object-utils";
import { TweenService } from "@rbxts/services";
import { t } from "@rbxts/t";
import  { Music, SoundEffects, type SoundID } from "types/enum/sounds";

interface SoundPlayProperties {
    soundID: SoundID,
    soundAdornee?: Instance,
    soundProperties?: InstanceProperties<Sound>
}

@Controller({})
export class AudioController implements OnInit {
    private readonly soundGroups = new Map<string, SoundGroup>();

    /** @ignore */
    onInit(): void | Promise<void> {
        // Suibscribes to current sound being played

    }

    public async CreateSoundGroup(): Promise<Sound | undefined> {
        return
    }

    public async CreateSound({ soundID, soundAdornee, soundProperties }: SoundPlayProperties) {
        const group = this.soundGroups.get(Object.values(Music).includes(soundID as Music) ? "Music" : "SoundEffects")
        const soundObject = Make("Sound", {
			...soundProperties,
			Name: `sound-${soundID}`,
			Parent: soundAdornee ?? group,
			SoundGroup: group,
			SoundId: `rbxassetid://${soundID}`,
		});

        return soundObject
    }

    public PlaySound(sound: SoundID, fadeInTime?: number) {
        const [ succ, soundObj ] = this.CreateSound({ soundID: sound }).await()
        if (!succ || !soundObj) return;

        soundObj.Play()

        if (fadeInTime !== undefined) {
			this.fadeInSound(soundObj, fadeInTime);
		}
	}

	public fadeInSound(soundObject: Sound, fadeInTime: number): void {
		const desiredVolume = soundObject.Volume;
		soundObject.Volume = 0;

		const tweenInfo = new TweenInfo(
			fadeInTime,
			Enum.EasingStyle.Quad,
			Enum.EasingDirection.Out,
		);

		TweenService.Create(soundObject, tweenInfo, { Volume: desiredVolume }).Play();
    }
}