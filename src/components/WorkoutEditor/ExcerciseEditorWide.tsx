import { Excercise } from "../../data/types";
import { RoughButton } from "../RoughButton";
import { RoughHr } from "../RoughHr";
import { RoughTextBox } from "../RoughTextBox";
import { SetCountEditor } from "./SetCountEditor";

export function ExcerciseEditor({
    excercise,
    onUpdateName,
    onMoveUp,
    onMoveDown,
    onDelete,
    onUpdateSetCount,
    isFirst,
    isLast,
}: {
    excercise: Excercise;
    onUpdateName: (newName: string) => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onDelete: () => void;
    onUpdateSetCount: (newSetCount: number) => void;
    isFirst: boolean;
    isLast: boolean;
}) {
    return (
        <li
            data-id={excercise.id}
            style={{
                fontSize: 26,
                display: "flex",
                gap: "0 0.4em",
                alignItems: "center",
            }}>
            <RoughButton onClick={onMoveUp} disabled={isFirst}>
                ⬆
            </RoughButton>
            <RoughButton onClick={onMoveDown} disabled={isLast}>
                ⬇
            </RoughButton>

            {excercise.name === "-" ? ( // divider
                <>
                    <div
                        style={{
                            flex: "1",
                            height: "2em",
                            paddingTop: "0.5em",
                        }}>
                        <RoughHr />
                    </div>
                    <RoughButton
                        onClick={onDelete}
                        bgColor="var(--button-bg-red)">
                        X
                    </RoughButton>
                </>
            ) : (
                // normal excercise
                <>
                    <RoughTextBox
                        value={excercise.name}
                        onChange={onUpdateName}
                        style={{ flex: "1" }}
                    />
                    <SetCountEditor
                        current={excercise.sets}
                        onChange={onUpdateSetCount}
                        onDelete={onDelete ?? (() => {})}
                    />
                </>
            )}
        </li>
    );
}
