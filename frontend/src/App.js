import './App.css';
import { useState } from 'react';
import {
    Container, 
    Grid, 
    Typography
} from '@mui/material';
import BodyMap from './components/body-map/BodyMap';
import ExerciseButtons from './components/actions/ExerciseButtons';
import ExerciseList from './components/ui/ExerciseList';

function App() {

    const [exercises, setExercises] = useState([]);

    const handleFetch = (fetchedExercises) => {
        setExercises(fetchedExercises);
    };

    return (
        <div>
            <Container fixed>
                <Typography textAlign="center" variant="h4" mt={5}>
                    Fitness App
                </Typography>
                <Grid container spacing={2} mt={2} mb={2}>
                    <Grid item xs={6}>
                        <ExerciseList exercises={exercises} />
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                        <ExerciseButtons onFetch={handleFetch} />
                        <BodyMap onFetch={handleFetch} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
