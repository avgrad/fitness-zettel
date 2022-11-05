import "./App.css";

import { createPortal } from "react-dom";
import { Route, Link, Switch } from "wouter";
import { useRegisterSW } from "virtual:pwa-register/react";
import { PaperFilter } from "./components/PaperFilter";
import { AddWorkoutPage } from "./pages/AddWorkoutPage";
import { ShowWorkoutPage } from "./pages/ShowWorkoutPage";
import { EditWorkoutPage } from "./pages/EditWorkoutPage";
import { HomePage } from "./pages/HomePage";
import { CloneWorkoutPage } from "./pages/CloneWorkoutPage";
import { FallbackPage } from "./pages/FallbackPage";
import { RoughBox } from "./components/RoughBox";
import { RoughButton } from "./components/RoughButton";

const icons = ["🏆", "💪🏼", "📝", "🏋🏼‍♀️", "🏋🏼‍♂️", "🏅"];
const todaysIcon = icons[Math.floor(Math.random() * icons.length)];

export default function App() {
    return (
        <div className="App">
            <header>
                <h1>
                    <Link href="/">{todaysIcon} Fitness Zettel</Link>
                </h1>
            </header>

            <main>
                <UpdatePrompt />

                <Switch>
                    <Route path="/" component={HomePage} />
                    <Route path="/workout/add" component={AddWorkoutPage} />
                    <Route
                        path="/workout/edit/:id"
                        component={EditWorkoutPage}
                    />
                    <Route
                        path="/workout/clone/:id"
                        component={CloneWorkoutPage}
                    />
                    <Route path="/workout/:id" component={ShowWorkoutPage} />
                    <Route component={FallbackPage} />
                </Switch>
            </main>

            {createPortal(<PaperFilter filterId="paper" />, document.body)}
        </div>
    );
}

function UpdatePrompt() {
    const {
        needRefresh: [appNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW();

    if (appNeedRefresh)
        return (
            <section className="update-prompt">
                <RoughBox fillStyle="zigzag" bgColor="#fc1">
                    <h3 style={{ margin: 0 }}>NEW VERSION AVAILABLE!</h3>
                    <p>
                        There is an update to the app available! Please reload
                        to use the newest version!
                    </p>
                    <p style={{ textAlign: "right", marginBottom: 0 }}>
                        <RoughButton
                            bgColor="#6d6"
                            onClick={() => updateServiceWorker(true)}>
                            👉🏼 Update now!
                        </RoughButton>
                    </p>
                </RoughBox>
            </section>
        );
    else return null;
}

