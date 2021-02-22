from django.urls import path
from .views import fetch_stations, all_stations

urlpatterns = [
    path('station/', fetch_stations),
    path('stations/', all_stations),
]