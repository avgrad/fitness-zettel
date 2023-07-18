import { db } from "./db";
import { Workout } from "./types";

// TODO the whole backup logic could be improved. Validation, better version-upgrades and more.
// But it is sufficient for now, as I don't expect much change in the types.

export type Backup = {
    version: number;
    db: { workouts: Workout[] };
};

export async function exportData(): Promise<Backup> {
    const workouts = await db.workouts.toArray();

    return {
        version: db.verno,
        db: {
            workouts,
        },
    };
}

export async function importData(backup: Backup): Promise<boolean> {
    // first map imported data to current scheme
    let dataMappedToCurrentVersion: Backup["db"];
    switch (backup.version) {
        case 1:
            dataMappedToCurrentVersion = mapImportDataVersion1(backup.db);
            break;
        default:
            alert("the backup file you tried to import is not valid.");
            return false;
    }

    if (!dataMappedToCurrentVersion) {
        alert("the backup file did not contain any data.");
        return false;
    }

    // clear tables
    await db.workouts.clear();

    // put everything from backup back into tables
    const { workouts } = dataMappedToCurrentVersion;
    await db.workouts.bulkPut(workouts);

    return true;
}

// for mapper functions
// when DB scheme is changed (types or tables) a new import map function must be created for that export-version.
// the input type for the mapping functions is NOT to be changed, because it represents the types of that versions backup.
// JS-Dates must be parsed when imported, because they are JSON-stringified, but indexeddb and remaining code expects JS-Dates.
// the return type is fixed to the current running app versions data scheme.

function mapImportDataVersion1(tables: {
    workouts: Array<{
        id: string;
        date: Date | string;
        excercises: {
            id: string;
            name: string;
            sets: number;
            setsDone: number;
        }[];
        notes: string;
    }>;
}): Backup["db"] {
    return {
        workouts: tables.workouts.map((w) => ({
            ...w,
            date: new Date(w.date),
        })),
    };
}
