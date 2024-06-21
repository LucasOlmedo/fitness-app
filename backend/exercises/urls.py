from django.urls import path
from .views import fetch_exercises, get_exercises_by_muscle

urlpatterns = [
    path('exercises/', fetch_exercises, name='fetch_exercises'),
    path('exercises/muscle/', get_exercises_by_muscle, name='get_exercises_by_muscle'),
]
