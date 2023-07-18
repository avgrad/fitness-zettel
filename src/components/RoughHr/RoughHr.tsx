import { useEffect, useRef } from "react";
import rough from "roughjs";
import useMeasure from "react-use-measure";
import { useSeed } from "../useSeed";

export function RoughHr({ style }: { style?: React.CSSProperties }) {
    const [containerRef, { width, height }] = useMeasure();

    const svgRef = useRef<SVGSVGElement>(null);
    const [seed] = useSeed();

    useEffect(() => {
        if (svgRef.current) {
            const roughSvg = rough.svg(svgRef.current);
            const line = roughSvg.line(0, 5, width, 5, {
                roughness: 1.8,
                stroke: "var(--button-border)",
                strokeWidth: 2,
                seed,
            });
            svgRef.current.appendChild(line);
            return () => svgRef.current?.replaceChildren();
        }
    }, [seed, width, height]);
    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                height: "10px",
                margin: "0.3em 0",
                ...(style ?? {}),
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
        </div>
    );
}
