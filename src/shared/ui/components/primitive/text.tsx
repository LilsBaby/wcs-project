import React, { PropsWithChildren } from "@rbxts/react";

interface TextProps extends PropsWithChildren {

}

export function Text({ children }: TextProps) {
    return <textlabel>
        {children}
    </textlabel>
}