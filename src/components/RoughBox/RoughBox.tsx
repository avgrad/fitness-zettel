import { ReactNode, useEffect, useRef } from "react";
import rough from "roughjs";
import useMeasure from "react-use-measure";
import { useSeed } from "../useSeed";

export function RoughBox({
    children,
    singleStroke = false,
    bgColor,
    fillStyle,
}: {
    children?: ReactNode;
    singleStroke?: boolean;
    bgColor?: string;
    fillStyle?:
        | "hachure"
        | "solid"
        | "zigzag"
        | "cross-hatch"
        | "dots"
        | "dashed"
        | "zigzag-line";
}) {
    const [containerRef, { width, height }] = useMeasure();
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
                fillStyle: fillStyle,
                fill: bgColor,
                fillWeight: 3,
                hachureGap: 6,
                disableMultiStroke: singleStroke,
                disableMultiStrokeFill: false,
                seed,
            });
            svg.appendChild(rect);
            return () => svg?.replaceChildren();
        }
    }, [seed, width, height, singleStroke, bgColor, fillStyle]);
    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
            }}>
            <svg
                viewBox={"0 0 " + width + " " + height}
                ref={svgRef}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex: -10,
                }}></svg>
            <div className="roughbox-content">{children}</div>
        </div>
    );
}
