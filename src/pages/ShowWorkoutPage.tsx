import { WorkoutDisplay } from "../components/WorkoutDisplay";

interface IProps {
    params: {
        id: string;
    };
}

export function ShowWorkoutPage({ params: { id } }: IProps) {
    return <WorkoutDisplay id={id} />;
}
