import { Link } from "wouter";
import { RoughButton } from "../components/RoughButton";
import { WorkoutList } from "../components/WorkoutList";

export function HomePage() {
    return (
        <div>
            <Link to="/workout/add">
                <RoughButton bgColor="#8c8">Add Workout</RoughButton>
            </Link>
            <WorkoutList />
        </div>
    );
}
