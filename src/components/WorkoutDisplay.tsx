import { useState } from "react";
import { useLocation } from "wouter";
import { RoughButton } from "../components/RoughButton";
import { RoughCheckbox } from "../components/RoughCheckbox";
import { RoughHr } from "../components/RoughHr";
import { db } from "../data/db";
import { useSetSetsDone, useWorkout } from "../data/hooks";
import { range } from "../data/utils";

interface IProps {
    id: string;
}

export function WorkoutDisplay({ id }: IProps) {
    const [_, setLocation] = useLocation();
    const workout = useWorkout(id);
    const setSetsDone = useSetSetsDone(id);
    const [displayEditButtons, setDisplayEditButtons] = useState(false);

    if (!workout) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                }}>
                <h2 style={{ flex: "1" }}>
                    {workout.date.toLocaleDateString()}
                </h2>
                <RoughButton
                    style={{ alignSelf: "center" }}
                    onClick={() => setDisplayEditButtons((s) => !s)}>
                    ...
                </RoughButton>
            </div>

            <div
                style={{
                    display: displayEditButtons ? "flex" : "none",
                    flexDirection: "row-reverse",
                    flexWrap: "wrap-reverse",
                    gap: "1em 0.6em",
                }}>
                <RoughButton
                    onClick={async () => {
                        if (confirm("Delete this Workout?")) {
                            await db.workouts.delete(workout.id);
                            history.back();
                        }
                    }}
                    bgColor="#d99">
                    🚮 Delete Workout
                </RoughButton>
                <RoughButton
                    onClick={() => setLocation("/workout/clone/" + id)}>
                    📃 Clone Workout
                </RoughButton>
                <RoughButton onClick={() => setLocation("/workout/edit/" + id)}>
                    🖊 Edit Workout
                </RoughButton>
            </div>

            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    fontSize: 28,
                }}>
                {Object.values(workout.excercises).map((ex) =>
                    ex.name === "-" ? (
                        <RoughHr key={ex.id} />
                    ) : (
                        <li
                            key={ex.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0 0.3em",
                                marginTop: "0.2em",
                                flexWrap: "wrap",
                            }}>
                            {ex.name}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: "0 0.1em",
                                }}>
                                {range(ex.sets).map((i) => (
                                    <RoughCheckbox
                                        style={{
                                            color:
                                                ex.sets === ex.setsDone
                                                    ? "#8c8"
                                                    : "#bbb",
                                        }}
                                        key={ex.id + i}
                                        checked={i < ex.setsDone}
                                        data-ind={i}
                                        onChange={(checked) =>
                                            setSetsDone(
                                                ex.id,
                                                ex.setsDone + (checked ? 1 : -1)
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
