// src/components/ExerciseButtons.js

import React from 'react';
import { fetchExercises } from '../api';
import { ButtonGroup, Button } from '@mui/material';

function ExerciseButtons({ onFetch }) {

    const handleFetch = async (forceRefresh = false) => {
        const result = await fetchExercises(forceRefresh);
        onFetch(result);
    };

    return (
        <div>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button color="primary" onClick={() => handleFetch(false)}>
                    Fetch Exercises
                </Button>
                <Button color="secondary" onClick={() => handleFetch(true)}>
                    Update Database
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default ExerciseButtons;
