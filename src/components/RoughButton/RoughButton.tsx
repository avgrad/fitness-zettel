import React, { useEffect, useRef, MouseEventHandler } from "react";
import rough from "roughjs";
import useMeasure from "react-use-measure";
import "./RoughButton.css";
import { useSeed } from "../useSeed";

type RoughButtonProps = React.PropsWithChildren<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    bgColor?: React.CSSProperties["backgroundColor"];
    style?: React.CSSProperties;
}>;

export function RoughButton({
    children,
    onClick,
    disabled = false,
    style,
    bgColor,
}: RoughButtonProps) {
    const [buttonRef, { width, height }] = useMeasure();
    const svgRef = useRef<SVGSVGElement>(null);
    const [seed] = useSeed();
    //console.log(seed);
    useEffect(() => {
        const svg = svgRef.current;
        if (svg) {
            const roughSvg = rough.svg(svg);
            const rect = roughSvg.rectangle(0, 0, width, height, {
                roughness: 1.8,
                strokeWidth: 2,
                fillStyle: "zigzag",
                hachureGap: 6,
                fill: "currentColor",
                fillWeight: 3,
                disableMultiStroke: false,
                disableMultiStrokeFill: false,
                seed,
            });
            svg.appendChild(rect);
            return () => svg?.replaceChildren();
        }
    }, [width, height, seed]);

    return (
        <button
            ref={buttonRef}
            className="rough-button"
            onClick={onClick}
            disabled={disabled}
            style={style}>
            <svg
                viewBox={"0 0 " + width + " " + height}
                ref={svgRef}
                style={{
                    color: bgColor,
                }}></svg>
            <span className="roughbox-content">{children}</span>
        </button>
    );
}
