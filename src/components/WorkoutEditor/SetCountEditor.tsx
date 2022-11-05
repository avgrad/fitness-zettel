import { RoughButton } from "../RoughButton";

interface ICountEditorProps {
    current: number;
    onChange: (n: number) => void;
    onDelete: () => void;
}

export function SetCountEditor({
    current,
    onChange,
    onDelete,
}: ICountEditorProps) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "auto 1.4em auto",
                placeItems: "center",
            }}>
            <RoughButton
                onClick={() =>
                    current > 1 ? onChange(current - 1) : onDelete()
                }
                bgColor={current > 1 ? undefined : "#d99"}>
                {current > 1 ? "-" : "X"}
            </RoughButton>
            <div>{current}</div>
            <RoughButton onClick={() => onChange(current + 1)}>+</RoughButton>
        </div>
    );
}
