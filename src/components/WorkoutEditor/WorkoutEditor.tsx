import { WorkoutData } from "../../data/types";
import { isFirst, isLast } from "../../data/utils";
import { ExcerciseEditor } from "./ExcerciseEditorSmall";
import { RoughButton } from "../RoughButton";
import { RoughTextBox } from "../RoughTextBox";

interface WorkoutEditorProps {
    workout: WorkoutData;
    addExcercise: (name: string, sets: number) => void;
    updateDate: (newDate: string) => void;
    updateNotes: (notes: string) => void;
    excerciseActions: ExcerciseActions;
}

interface ExcerciseActions {
    updateExcerciseName: (exId: string, newName: string) => void;
    moveExcerciseDown: (exId: string) => void;
    moveExcerciseUp: (exId: string) => void;
    removeExcercise: (exId: string) => void;
    updateSetCount: (exId: string, newSetCount: number) => void;
}

export function WorkoutEditor(props: WorkoutEditorProps) {
    const {
        workout,
        addExcercise,
        updateDate,
        updateNotes,
        excerciseActions: {
            updateExcerciseName,
            moveExcerciseDown,
            moveExcerciseUp,
            removeExcercise,
            updateSetCount,
        },
    } = props;

    const excercises = Object.values(workout.excercises);
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    fontSize: 24,
                    marginBottom: 12,
                }}>
                <span style={{ placeSelf: "center", fontWeight: "bold" }}>
                    Date:
                </span>
                <RoughTextBox
                    type="date"
                    value={workout.date.toISOString().substring(0, 10)}
                    onChange={(newDate) => updateDate(newDate)}
                    style={{
                        flex: "1",
                    }}
                />
            </div>

            <ul
                style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    margin: 0,
                    gap: "0.6rem",
                }}>
                {excercises.map((ex) => (
                    <ExcerciseEditor
                        key={ex.id}
                        excercise={ex}
                        isFirst={isFirst(excercises, ex)}
                        isLast={isLast(excercises, ex)}
                        onUpdateName={(newName) =>
                            updateExcerciseName(ex.id, newName)
                        }
                        onDelete={() => removeExcercise(ex.id)}
                        onUpdateSetCount={(newSetCount) =>
                            updateSetCount(ex.id, newSetCount)
                        }
                        onMoveDown={() => moveExcerciseDown(ex.id)}
                        onMoveUp={() => moveExcerciseUp(ex.id)}
                    />
                ))}
            </ul>

            <div
                style={{
                    display: "flex",
                    marginTop: "1.2rem",
                    marginBottom: "1rem",
                    gap: "0.6em",
                    justifyContent: "center",
                }}>
                <RoughButton onClick={() => addExcercise("", 1)}>
                    Add Excercise
                </RoughButton>
                <RoughButton onClick={() => addExcercise("-", 0)}>
                    Add Divider
                </RoughButton>
            </div>

            {/* <RoughTextBox value={workout.notes} onChange={updateNotes} /> */}

            {/* <pre>
                <code>{JSON.stringify(props, null, 2)}</code>
            </pre> */}
        </div>
    );
}
