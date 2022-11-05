import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "./db";
import { Workout } from "./types";
import { moveIndexDown, moveIndexUp } from "./utils";

export function useWorkouts() {
    return useLiveQuery(async () => {
        return await db.workouts.orderBy("date").reverse().toArray();
    }, []);
}

export function useWorkout(id: string) {
    return useLiveQuery(async () => {
        return await db.workouts.get(id);
    }, [id]);
}

export function useSetSetsDone(workoutId: string) {
    const setSetsDoneInWorkout = useCallback(
        (exId: string, newSetsDoneCount: number) => {
            db.workouts.update(workoutId, (dbWo: Workout) => {
                const dbEx = dbWo.excercises.find((e) => e.id === exId);
                if (dbEx) dbEx.setsDone = newSetsDoneCount;
                else
                    throw new Error(
                        `exercise ${exId} in workout ${workoutId} not found`
                    );
            });
        },
        []
    );

    return setSetsDoneInWorkout;
}

export function useWorkoutState(initialData: Workout) {
    const [workout, setWorkout] = useState<Workout>(initialData);

    useEffect(() => {
        if (workout) return;
        if (initialData) setWorkout(initialData);
    }, [initialData]);

    // workout actions

    const updateDate = useCallback((newDate: string) => {
        if (newDate)
            setWorkout((w) => ({
                ...w,
                date: new Date(newDate),
            }));
    }, []);

    const addExcercise = useCallback((name: string, sets: number) => {
        const id = crypto.randomUUID();
        setWorkout((w) => ({
            ...w,
            excercises: w.excercises.concat({
                id,
                name,
                sets,
                setsDone: 0,
            }),
        }));
    }, []);

    const updateNotes = useCallback((notes: string) => {
        setWorkout((w) => ({
            ...w,
            notes,
        }));
    }, []);

    // excercise specific actions

    const removeExcercise = useCallback((id: string) => {
        setWorkout((w) => ({
            ...w,
            excercises: w.excercises.filter((e) => e.id !== id),
        }));
    }, []);

    const moveExcerciseUp = useCallback((id: string) => {
        setWorkout((w) => ({
            ...w,
            excercises: moveIndexUp(
                w.excercises,
                w.excercises.findIndex((e) => e.id === id)
            ),
        }));
    }, []);

    const moveExcerciseDown = useCallback((id: string) => {
        setWorkout((w) => ({
            ...w,
            excercises: moveIndexDown(
                w.excercises,
                w.excercises.findIndex((e) => e.id === id)
            ),
        }));
    }, []);

    const updateSetCount = useCallback((exId: string, newSetCount: number) => {
        setWorkout((w) => ({
            ...w,
            excercises: w.excercises.map((e) =>
                e.id === exId
                    ? {
                          ...e,
                          sets: newSetCount,
                          setsDone: Math.min(e.setsDone, newSetCount),
                      }
                    : e
            ),
        }));
    }, []);

    const updateExcerciseName = useCallback((exId: string, newName: string) => {
        setWorkout((w) => ({
            ...w,
            excercises: w.excercises.map((e) =>
                e.id === exId ? { ...e, name: newName } : e
            ),
        }));
    }, []);

    const workoutActions = useMemo(
        () => ({
            addExcercise,
            updateDate,
            updateNotes,
        }),
        [addExcercise, updateDate]
    );

    const excerciseActions = useMemo(
        () => ({
            updateExcerciseName,
            removeExcercise,
            moveExcerciseUp,
            moveExcerciseDown,
            updateSetCount,
        }),
        [
            updateExcerciseName,
            removeExcercise,
            moveExcerciseUp,
            moveExcerciseDown,
            updateSetCount,
        ]
    );

    return {
        workout,
        workoutActions,
        excerciseActions,
    };
}
