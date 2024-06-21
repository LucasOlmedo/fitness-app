import React, { useState, useCallback, useEffect } from 'react';
import Model from "react-body-highlighter";
import './body-map.css';
import { getExerciseByMuscle } from '../api';

function BodyMap({ onFetch }) {

    const initialData = [
        {
            name: "Trapezius Workouts",
            muscles: ["trapezius"],
            keywords: [
                { key: 'target', value: 'traps' },
                { key: 'secondary-muscles', value: 'traps,trapezius' }
            ],
        },
        {
            name: "Upper Back Workouts",
            muscles: ["upper-back"],
            keywords: [
                { key: 'body-part', value: 'back' },
                { key: 'target', value: 'upper back,lats' },
                { key: 'secondary-muscles', value: 'upper back,rhomboids' },
            ],
        },
        {
            name: "Lower Back Workouts",
            muscles: ["lower-back"],
            keywords: [
                { key: 'secondary-muscles', value: 'lower back' },
            ],
        },
        {
            name: "Chest Workouts",
            muscles: ["chest"],
            keywords: [
                { key: 'body-part', value: 'chest' },
                { key: 'secondary-muscles', value: 'chest' },
            ],
        },
        {
            name: "Triceps Workouts",
            muscles: ["triceps"],
            keywords: [
                { key: 'target', value: 'triceps' },
                { key: 'secondary-muscles', value: 'triceps' },
            ],
        },
        {
            name: "Biceps Workouts",
            muscles: ["biceps"],
            keywords: [
                { key: 'target', value: 'biceps' },
                { key: 'secondary-muscles', value: 'biceps' },
            ],
        },
        {
            name: "Forearm Workouts",
            muscles: ["forearm"],
            keywords: [
                { key: 'target', value: 'forearms' },
                { key: 'secondary-muscles', value: 'forearms' },
            ],
        },
        {
            name: "Back Deltoids Workouts",
            muscles: ["back-deltoids"],
            keywords: [
                { key: 'body-part', value: 'shoulders' },
                { key: 'target', value: 'delts' },
                { key: 'secondary-muscles', value: 'rhomboids' },
            ],
        },
        {
            name: "Front Deltoids Workouts",
            muscles: ["front-deltoids"],
            keywords: [
                { key: 'body-part', value: 'shoulders' },
                { key: 'target', value: 'delts' },
                { key: 'secondary-muscles', value: 'shoulders' },
            ],
        },
        {
            name: "Neck Workouts",
            muscles: ["neck"],
            keywords: [
                { key: 'body-part', value: 'neck' },
                { key: 'target', value: 'levator scapulae' },
                { key: 'secondary-muscles', value: 'sternocleidomastoid' },
            ],
        },
        {
            name: "Abs Workouts",
            muscles: ["abs"],
            keywords: [
                { key: 'body-part', value: 'waist' },
                { key: 'target', value: 'abs' },
                { key: 'secondary-muscles', value: 'core,hip flexors,obliques' },
            ],
        },
        {
            name: "Obliques Workouts",
            muscles: ["obliques"],
            keywords: [
                { key: 'secondary-muscles', value: 'obliques' },
            ],
        },
        {
            name: "Adductor Workouts",
            muscles: ["adductor"],
            keywords: [
                { key: 'target', value: 'adductors' },
            ],
        },
        {
            name: "Hamstring Workouts",
            muscles: ["hamstring"],
            keywords: [
                { key: 'body-part', value: 'upper legs' },
                { key: 'target', value: 'quads,hamstrings' },
                { key: 'secondary-muscles', value: 'hamstrings' },
            ],
        },
        {
            name: "Quadriceps Workouts",
            muscles: ["quadriceps"],
            keywords: [
                { key: 'body-part', value: 'upper legs' },
                { key: 'target', value: 'quads' },
                { key: 'secondary-muscles', value: 'quadriceps' },
            ],
        },
        {
            name: "Abductors Workouts",
            muscles: ["abductors"],
            keywords: [
                { key: 'target', value: 'abductors' },
            ],
        },
        {
            name: "Calves Workouts",
            muscles: ["calves"],
            keywords: [
                { key: 'body-part', value: 'lower legs' },
                { key: 'target', value: 'calves' },
            ],
        },
        {
            name: "Gluteal Workouts",
            muscles: ["gluteal"],
            keywords: [
                { key: 'target', value: 'glutes' },
                { key: 'secondary-muscles', value: 'glutes' },
            ],
        },
    ];

    const [allExercises] = useState(initialData);
    const [selectedMuscles, setSelectedMuscles] = useState([]);
    const [data, setData] = useState([]);

    const handleClick = useCallback(({ muscle }) => {
        setSelectedMuscles((prevSelectedMuscles) => {
            if (prevSelectedMuscles.includes(muscle)) {
                return prevSelectedMuscles.filter(m => m !== muscle);
            }
            return [...prevSelectedMuscles, muscle];
        });

    }, []);

    useEffect(() => {
        const newData = allExercises.filter(exercise =>
            exercise.muscles.some(muscle => selectedMuscles.includes(muscle))
        );
        setData(newData);

        let params = { 'body-part': [], 'target': [], 'secondary-muscles': [] };
        for (const m of newData) {
            let body_part = m.keywords.find(x => x.key === 'body-part');
            if (body_part) {
                params['body-part'].push(body_part.value);
            }

            let target = m.keywords.find(x => x.key === 'target');
            if (target) {
                params['target'].push(target.value);
            }

            let second_muscle = m.keywords.find(x => x.key === 'secondary-muscles');
            if (second_muscle) {
                params['secondary-muscles'].push(second_muscle.value);
            }
        }
        let querystring = `body-part=${params['body-part'].join(',')}&target=${params['target'].join(',')}&secondary-muscles=${params['secondary-muscles'].join(',')}`;
        getExerciseByMuscle(querystring).then(result => {
            onFetch(result);
        });

    }, [selectedMuscles, allExercises]);

    return (
        <div className="MuscleViewer">
            <Model type="anterior" data={data} onClick={handleClick} />
            <Model type="posterior" data={data} onClick={handleClick} />
        </div>
    );
}

export default BodyMap;
