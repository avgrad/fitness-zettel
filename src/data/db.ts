import Dexie from "dexie";
import { Workout } from "./types";

class LocalDatabase extends Dexie {
    workouts!: Dexie.Table<Workout>;

    constructor() {
        super("fitness-zettel");

        // declare schemas for versions
        this.version(1).stores({
            workouts: "id, date",
            templates: "id, name",
        });
    }
}

export const db = new LocalDatabase();

db.open().then();
