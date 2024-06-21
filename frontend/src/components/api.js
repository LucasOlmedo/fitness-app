// src/components/api.js

const API_URL = 'http://127.0.0.1:8000/api/exercises/';

export const fetchExercises = async (forceRefresh = false) => {
    const url = forceRefresh ? `${API_URL}?force-refresh=true` : API_URL;

    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return [];
    }
};

export const getExerciseByMuscle = async (params) => {
    try {
        const response = await fetch(`${API_URL}muscle/?${params}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching exercises by muscle:', error);
        return [];
    }
}
