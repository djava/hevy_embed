import { Url } from "url";
import { JSONExercise, JSONSet } from "./api_interface";
import { isNumberObject } from "util/types";
import { isUndefined } from "util";

export enum MuscleGroup {
    Chest = "Chest",
    Arms = "Arms",
    Legs = "Legs",
    Back = "Back",
    Core = "Core",
    Shoulders = "Shoulders"
}

export enum SetIndicator {
    Warmup = "Warmup",
    Normal = "Normal",
    Drop = "Drop",
    Failure = "Failure"
}

class BasicSet {
    indicator: SetIndicator;
    personal_record: boolean;

    constructor(json_data: JSONSet) {
        this.indicator = json_data.indicator as SetIndicator;
        this.personal_record = (json_data.personalRecords.length !== 0);
    }
}

export class WeightSet extends BasicSet {
    weight_lbs: number;
    reps: number;

    constructor(json_data: JSONSet) {
        const KG_TO_LBS = 2.205;

        if (isNumberObject(json_data.weight_kg) && isNumberObject(json_data.reps)) {
            super(json_data);

            this.weight_lbs = json_data.weight_kg * KG_TO_LBS;
            this.reps = json_data.reps;
        } else {
            throw new Error("Constructed WeightSet with wrong data type");
        }
    }
}

class BasicExercise {
    title: string;
    superset: boolean;
    muscle_group: MuscleGroup;
    other_muscles: MuscleGroup[];
    thumbnail_url: string;
    sets: BasicSet[];

    constructor(json_data: JSONExercise, sets?: BasicSet[]) {
        this.title = json_data.title;
        this.superset = (json_data.superset_id != undefined);
        this.muscle_group = json_data.muscle_group as MuscleGroup;
        this.other_muscles = json_data.other_muscles as MuscleGroup[];
        this.thumbnail_url = json_data.thumbnail_url;
        if (sets === undefined) {
            this.sets = json_data.sets.map(i => new BasicSet(i));
        } else {
            this.sets = sets; 
        }
    }
}

export class WeightExercise extends BasicExercise {
    weight_sets: WeightSet[];

    constructor(json_data: JSONExercise) {
        const weight_sets = json_data.sets.map(i => new WeightSet(i));
        super(json_data, weight_sets);
        this.weight_sets = weight_sets;
    }
}