import { useEffect, useRef, useCallback } from "react";
import rough from "roughjs";
import useMeasure from "react-use-measure";
import "./RoughTextBox.css";
import { useSeed } from "../useSeed";

interface RoughTextBoxProps {
    type?: "text" | "date";
    value: string;
    onChange: (newValue: string) => void;
    style?: React.CSSProperties;
}

export function RoughTextBox({
    type = "text",
    value,
    onChange,
    style,
}: RoughTextBoxProps) {
    const [inputRef, { width, height }] = useMeasure();
    const svgRef = useRef<SVGSVGElement>(null);
    const [seed] = useSeed();
    //console.log(seed);
    useEffect(() => {
        const svg = svgRef.current;
        if (svg) {
            const roughSvg = rough.svg(svg);
            const underlineHeight = 10;
            const underline = roughSvg.linearPath(
                [
                    [0, height - underlineHeight],
                    [0, height],
                    [width, height],
                    [width, height - underlineHeight],
                ],
                {
                    roughness: 1.8,
                    strokeWidth: 2,
                    disableMultiStroke: true,
                    disableMultiStrokeFill: false,
                    preserveVertices: true,
                    seed,
                    stroke: "currentColor",
                }
            );
            svg.appendChild(underline);
            return () => svg?.replaceChildren();
        }
    }, [width, height, seed]);

    const changeHandler = useCallback<
        React.ChangeEventHandler<HTMLInputElement>
    >(
        (e) => {
            if (onChange) onChange(e.currentTarget.value);
        },
        [onChange]
    );

    return (
        <div ref={inputRef} className="rough-textbox" style={style}>
            <svg viewBox={"0 0 " + width + " " + height} ref={svgRef}></svg>
            <input type={type} value={value} onChange={changeHandler}></input>
        </div>
    );
}
