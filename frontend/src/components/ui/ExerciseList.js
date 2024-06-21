import React from 'react';
import {
    Card,
    CardMedia,
    CardActionArea,
    Grid
} from '@mui/material';

function ExerciseList({ exercises }) {
    return (
        <Grid container alignItems="center" spacing={2} wrap="wrap">
            {exercises.map((exercise, index) => (
                <Grid item xs={4} key={index}>
                    <Card>
                        <CardActionArea>
                            <CardMedia component="img" image={exercise.gifUrl} />
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default ExerciseList;
