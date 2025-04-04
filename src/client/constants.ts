import { Players } from "@rbxts/services";
import Tree from "shared/packages/tree";

export const { LocalPlayer } = Players;

export const USER_NAME = LocalPlayer.Name;
export const USER_ID = LocalPlayer.UserId;
export const USER_BODY = LocalPlayer.Character || LocalPlayer.CharacterAdded.Wait()[0]
export const USER_PRIMARY = Tree.Await(
    USER_BODY,
    "HumanoidRootPart",
) as BasePart;

export const PLAYER_GUI = Tree.Await(LocalPlayer, "PlayerGui");