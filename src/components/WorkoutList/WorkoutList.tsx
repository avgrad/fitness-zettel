import { Link } from "wouter";
import { useWorkouts } from "../../data/hooks";
import { Workout } from "../../data/types";
import "./WorkoutList.css";

export function WorkoutList() {
    const workouts = useWorkouts();

    if (!workouts) {
        return <div>Loading...</div>;
    }

    return (
        <ul className="workout-list">
            {workouts.map((workout) => (
                <WorkoutEntry workout={workout} key={workout.id} />
            ))}
        </ul>
    );
}

function WorkoutEntry({ workout }: { workout: Workout }) {
    const workoutCompleted = workout.excercises.every(
        (ex) => ex.setsDone === ex.sets
    );
    return (
        <li>
            <Link href={"/workout/" + workout.id}>
                {workout.date.toLocaleDateString()}
            </Link>
            {workoutCompleted && <span className="workout-completed">✔</span>}
        </li>
    );
}
