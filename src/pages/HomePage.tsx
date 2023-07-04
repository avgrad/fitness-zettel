import { Link } from "wouter";
import { RoughButton } from "../components/RoughButton";
import { WorkoutList } from "../components/WorkoutList";

export function HomePage() {
    return (
        <div>
            <div className="flex">
                <Link to="/workout/add">
                    <RoughButton bgColor="var(--button-bg-green)">
                        Add Workout
                    </RoughButton>
                </Link>
                <div className="flex-1" />
                <Link to="/settings">
                    <RoughButton>
                        <span role="img" aria-label="settings">
                            ⚙
                        </span>
                    </RoughButton>
                </Link>
            </div>
            <WorkoutList />
        </div>
    );
}
