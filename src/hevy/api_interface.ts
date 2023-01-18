export interface JSONPersonalRecord {
    type: string;
    value: number;
}

export interface JSONSet {
    id: number;
    index: number;
    indicator: string;
    weight_kg?: number;
    reps?: number;
    distance_meters?: number;
    duration_seconds?: number;
    rpe?: any;
    personalRecords: JSONPersonalRecord[];
}

export interface JSONExercise {
    id: string;
    title: string;
    es_title: string;
    de_title: string;
    fr_title: string;
    it_title: string;
    pt_title: string;
    superset_id?: number;
    rest_seconds: number;
    notes: string;
    exercise_template_id: string;
    url: string;
    exercise_type: string;
    equipment_category: string;
    media_type: string;
    custom_exercise_image_url?: any;
    custom_exercise_image_thumbnail_url: string;
    thumbnail_url: string;
    muscle_group: string;
    other_muscles: string[];
    priority: number;
    sets: JSONSet[];
}

export interface Workout {
    type: string;
    id: string;
    short_id: string;
    name: string;
    create_at: Date;
    start_time: number;
    end_time: number;
    username: string;
    profile_image: string;
    preview_image?: any;
    is_private: boolean;
    exercises: JSON[];
    weight_unit: string;
    distance_unit: string;
}