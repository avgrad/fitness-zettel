import { Suspense } from "react";
import { EditWorkoutForm } from "../components/EditWorkoutForm";

interface IProps {
    params: {
        id: string;
    };
}

export function EditWorkoutPage({ params: { id } }: IProps) {
    return (
        <div>
            <h2>Edit Workout</h2>
            <Suspense fallback="Loading...">
                <EditWorkoutForm id={id} />
            </Suspense>
        </div>
    );
}
