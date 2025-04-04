import { UserInputService } from "@rbxts/services";

export class Keyboard {
    public static getDevice() {
        if (UserInputService.KeyboardEnabled)
            return "Keyboard"
        else if (UserInputService.TouchEnabled)
            return "Mobile"
        else if (UserInputService.GamepadEnabled)
            return "Gamepad"
    }
}