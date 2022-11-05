import { clear, suspend } from "suspend-react";
import { useLocation } from "wouter";
import { db } from "../data/db";
import { useWorkoutState } from "../data/hooks";
import { RoughButton } from "./RoughButton";
import { WorkoutEditor } from "./WorkoutEditor";

interface IProps {
    id: string;
    cloneWorkout?: boolean;
}

export function EditWorkoutForm({ id, cloneWorkout }: IProps) {
    const [_, setLocation] = useLocation();
    const dbWorkout = suspend(async () => {
        const workout = await db.workouts.get(id);
        if (workout && cloneWorkout === true) {
            workout.id = crypto.randomUUID();
            workout.date = new Date();
            workout.excercises.forEach((e) => {
                e.id = crypto.randomUUID();
                e.setsDone = 0;
            });
        }
        return workout;
    }, [cloneWorkout === true ? "clone" : "edit", id]);

    if (!dbWorkout) return <div>workout not found</div>;

    const { workout, workoutActions, excerciseActions } =
        useWorkoutState(dbWorkout);

    const saveWorkout = async () => {
        await db.workouts.put(workout, workout.id);
        if (cloneWorkout === true) setLocation("/workout/" + workout.id);
        else history.back();
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
            <RoughButton
                onClick={() => {
                    // MUST clear cache from suspend, or it will use cached values on second edit.
                    // for simplicity and because this is the only place suspend-react is used, clear all instead of specific key
                    clear();
                    saveWorkout();
                }}
                bgColor="#8c8">
                Save Workout
            </RoughButton>
        </div>
    );
}
