import { useLocation } from "wouter";
import { db } from "../data/db";
import { useWorkoutState } from "../data/hooks";
import { RoughButton } from "./RoughButton";
import { WorkoutEditor } from "./WorkoutEditor";

export function AddWorkoutForm() {
    const [_, setLocation] = useLocation();
    const { workout, workoutActions, excerciseActions } = useWorkoutState({
        id: crypto.randomUUID(),
        date: new Date(),
        excercises: [],
        notes: "",
    });

    const saveWorkout = async () => {
        await db.workouts.add(workout, workout.id);
        setLocation("/workout/" + workout.id);
    };

    return (
        <div>
            <WorkoutEditor
                workout={workout}
                addExcercise={workoutActions.addExcercise}
                updateDate={workoutActions.updateDate}
                updateNotes={workoutActions.updateNotes}
                excerciseActions={excerciseActions}
            />
            <RoughButton onClick={saveWorkout} bgColor="var(--button-bg-green)">
                Save Workout
            </RoughButton>
        </div>
    );
}
