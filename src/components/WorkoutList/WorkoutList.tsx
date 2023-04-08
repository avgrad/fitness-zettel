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

const dateFormat = Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
});

function WorkoutEntry({ workout }: { workout: Workout }) {
    const isToday =
        workout.date.toISOString().substring(0, 10) ===
        new Date().toISOString().substring(0, 10);
    const workoutCompleted = workout.excercises.every(
        (ex) => ex.setsDone === ex.sets
    );

    return (
        <li>
            {isToday && (
                <span role="img" aria-label="today">
                    📅{" "}
                </span>
            )}
            <Link href={"/workout/" + workout.id}>
                {dateFormat.format(workout.date)}
            </Link>
            {workoutCompleted && <span className="workout-completed">✔</span>}
        </li>
    );
}
