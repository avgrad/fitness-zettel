import { Suspense } from "react";
import { EditWorkoutForm } from "../components/EditWorkoutForm";

interface IProps {
    params: {
        id: string;
    };
}

export function CloneWorkoutPage({ params: { id } }: IProps) {
    return (
        <div>
            <h2>Clone Workout</h2>
            <Suspense fallback="Loading...">
                <EditWorkoutForm id={id} cloneWorkout />
            </Suspense>
        </div>
    );
}
