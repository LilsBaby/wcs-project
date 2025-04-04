import React, { ReactNode } from "@rbxts/react";


interface BillboardProps extends React.PropsWithChildren {
	readonly adornee: BasePart
	readonly size: UDim2
	readonly sizeOffset?: Vector2
	readonly active?: boolean;
	readonly sightDistance?: number;
}

export function Billboard({
	adornee,
	size,
	sizeOffset,
	sightDistance = math.huge,
	active = true,
	children
}: BillboardProps) {
	return (
		<billboardgui
			Name="Billboard"
			Adornee={adornee}
			Size={size}
			SizeOffset={sizeOffset}
			LightInfluence={0}
			MaxDistance={sightDistance}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			{children}
		</billboardgui>
	);
}