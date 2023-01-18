import fetch from 'node-fetch';
import { Workout } from './api_interface';

async function get_workout_json(workout_id : string): Promise<Workout> {
    const base_url = 'https://api.hevyapp.com/workout/'
    const headers = {
        'x-api-key': 'with_great_power',
        'Content-Type': 'application/json'
    };

    const response = await fetch(`${base_url}/${workout_id}`, {headers: headers});
    return await response.json() as Workout;
}