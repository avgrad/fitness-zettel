export type Identifiable = {
    id: string;
};

export type BaseExcerciseData = {
    name: string;
    sets: number;
};

export type ExcerciseData = BaseExcerciseData & {
    setsDone: number;
};

export type Excercise = Identifiable & ExcerciseData;

export type WorkoutData = {
    date: Date;
    excercises: Excercise[];
    notes: string;
};

export type Workout = Identifiable & WorkoutData;

export type TemplateExcerciseData = Identifiable & BaseExcerciseData;

export type WorkoutTemplateData = {
    name: string;
    excercises: TemplateExcerciseData[];
};

export type WorkoutTemplate = Identifiable & WorkoutTemplateData;
