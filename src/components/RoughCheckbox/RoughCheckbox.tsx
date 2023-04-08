import { useEffect, useRef, useCallback, ChangeEventHandler } from "react";
import rough from "roughjs";
import "./RoughCheckbox.css";
import { useSeed } from "../useSeed";

export function RoughCheckbox({
    checked,
    label,
    onChange,
    style,
}: {
    checked: boolean;
    label?: string;
    onChange: (checked: boolean) => void;
    style?: React.CSSProperties;
}) {
    const size = 40;
    const svgRef = useRef<SVGSVGElement>(null);
    const changeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => onChange && void onChange(e.currentTarget.checked),
        [onChange]
    );
    const [seedBox] = useSeed();
    const [seedMark, reseedMark] = useSeed();

    useEffect(() => {
        const svg = svgRef.current;
        if (svg) {
            const roughSvg = rough.svg(svg);
            const circle = roughSvg.circle(size / 2, size / 2, size * 0.8, {
                roughness: 1.7,
                stroke: "var(--button-border)",
                strokeWidth: 2,
                fillStyle: "cross-hatch",
                fill: "currentColor",
                fillWeight: 3,
                hachureGap: 5,
                disableMultiStroke: true,
                disableMultiStrokeFill: false,
                seed: seedBox,
            });
            svg.appendChild(circle);

            const checkmark = roughSvg.linearPath(
                [
                    [size * 0.1, size * 0.3],
                    [size * 0.4, size * 0.7],
                    [size * 1.0, size * 0.0],
                ],
                {
                    roughness: 1.8,
                    stroke: "var(--button-border)",
                    strokeWidth: 6,
                    disableMultiStroke: true,
                    disableMultiStrokeFill: false,
                    preserveVertices: true,
                    seed: seedMark,
                }
            );
            checkmark.classList.add("rough-checkbox-checkmark");
            svg.appendChild(checkmark);
            return () => svg.replaceChildren();
        }
    }, [seedBox, seedMark]);

    // reseed checkmark when box becomes unchecked
    useEffect(() => void (!checked && reseedMark()), [checked, reseedMark]);

    return (
        <label className="rough-checkbox" style={style}>
            <input checked={checked} onChange={changeHandler} type="checkbox" />
            <svg
                viewBox={`0 0 ${size} ${size}`}
                width={size}
                height={size}
                ref={svgRef}></svg>
            {label}
        </label>
    );
}
