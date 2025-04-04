import Vide, { Derivable, read } from "@rbxts/vide";
import { px } from "../hooks/use-px";
import { Billboard } from "./primitive/billboard";

interface NametagProps {
	readonly adornee: Derivable<BasePart>;
	readonly name: Derivable<string>;
	readonly level: Derivable<number>;
}

export function Nametag({ adornee, name, level = 0 }: NametagProps): Vide.Node {
	const levelText = () => tostring(read(level));

	return <Billboard adornee={adornee} size={() => UDim2.fromOffset(px(5), px(10))}></Billboard>;
}
