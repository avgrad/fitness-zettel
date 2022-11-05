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
            <div
                style={{
                    display: "flex",
                    gap: "0 0.4em",
                }}>
                <RoughButton onClick={onMoveUp} disabled={isFirst}>
                    ⬆
                </RoughButton>
                <RoughButton onClick={onMoveDown} disabled={isLast}>
                    ⬇
                </RoughButton>
            </div>

            {excercise.name === "-" ? ( // divider
                <>
                    <div
                        style={{
                            flex: "1",
                            height: "3.5em",
                            paddingTop: "1.2em",
                        }}>
                        <RoughHr />
                    </div>
                    <RoughButton onClick={onDelete} bgColor="#d99">
                        X
                    </RoughButton>
                </>
            ) : (
                // normal excercise
                <>
                    <div
                        style={{
                            flex: "1",
                        }}>
                        <RoughTextBox
                            value={excercise.name}
                            onChange={onUpdateName}
                            style={{ flex: "1" }}
                        />
                        <div
                            style={{
                                display: "flex",
                                height: "2em",
                                alignItems: "center",
                                flexDirection: "row-reverse",
                            }}>
                            <SetCountEditor
                                current={excercise.sets}
                                onChange={onUpdateSetCount}
                                onDelete={onDelete ?? (() => {})}
                            />
                            Sets:&nbsp;
                        </div>
                    </div>
                </>
            )}
        </li>
    );
}
