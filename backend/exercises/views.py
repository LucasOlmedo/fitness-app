from django.shortcuts import render
import requests
import diskcache as dc
from django.http import JsonResponse

# Create your views here.

def fetch_exercises(request):
    cache = dc.Cache('cache_directory')

    force_refresh = request.GET.get('force-refresh')
    if force_refresh:
        cache.clear()

    exercises = []
    if 'exercises' in cache:
        exercises = cache['exercises']
    else:
        url = "https://exercisedb.p.rapidapi.com/exercises"
        params = {"limit": request.GET.get('limit', 9999), "offset": request.GET.get('offset')}
        headers = {
            "x-rapidapi-key": "46853b9f65msh696f9a3e64c978ap1432bbjsn5545ae7c1092",
            "x-rapidapi-host": "exercisedb.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers, params=params)
        exercises = response.json()
        cache['exercises'] = exercises

    return JsonResponse(exercises, safe=False)

def get_exercises_by_muscle(request):
    cache = dc.Cache('cache_directory')

    exercises = []
    if 'exercises' in cache:
        exercises = cache['exercises']
    else:
        exercises = fetch_exercises(request)

    def filter_exercises_by_attribute(attribute, values):
        if not values:
            return []
        return [ex for ex in exercises if ex.get(attribute) in values]

    body_part = request.GET.get('body-part', '').split(',')
    target = request.GET.get('target', '').split(',')
    secondary_muscle = request.GET.get('secondary-muscles', '').split(',')

    filtered_by_body_part = filter_exercises_by_attribute('bodyPart', body_part)
    filtered_by_target = filter_exercises_by_attribute('target', target)
    filtered_by_secondary_muscles = [
        ex for ex in exercises if any(muscle in ex.get('secondaryMuscles', []) for muscle in secondary_muscle)
    ]

    filtered_exercises = list({ex['id']: ex for ex in (filtered_by_body_part + filtered_by_target + filtered_by_secondary_muscles)}.values())
    return JsonResponse(filtered_exercises, safe=False)
