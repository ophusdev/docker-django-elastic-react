from django.shortcuts import render
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, Q
from django.http import JsonResponse
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from backend import settings
import json

def fetch_stations(request):
    query_dict = request.GET
    id = query_dict.get('id')
    client = settings.ELASTIC_CONN
    s = Search(using=client,index='station-*')

    if not id:
        return JsonResponse({'error': "Invalid or Empty Field"}, status=HTTP_400_BAD_REQUEST)

    else:
        if id.isspace():
            return JsonResponse({'error': "Invalid or Empty Field"}, status=HTTP_400_BAD_REQUEST)

        q = Q("term", id=int(id))
        s = s.query(q)
        response = s.execute()

        data = []
        if response:

            for r in response:
                tmp = {}
                tmp['properties'] = {}
                tmp['geometry'] = {}

                tmp['type'] = 'Feature'
                tmp['properties']['id'] = r['id']
                tmp['properties']['name'] = r['owner']
                tmp['properties']['address'] = r['address']
                tmp['properties']['province'] = r['province']
                tmp['properties']['brand'] = r['brand']
                tmp['properties']['city'] = r['city']
                tmp['geometry']['type'] = 'Point'
                tmp['geometry']['coordinates'] = [float(r['location']['lon']), float(r['location']['lat'])]

                data.append(tmp)

        return JsonResponse(data,status=HTTP_200_OK,safe=False)

def all_stations(request):
    client = settings.ELASTIC_CONN
    s = Search(using=client,index='station')

    query_dict = request.GET
    zoom = query_dict.get('zoom')
    lat = query_dict.get('lat')
    lng = query_dict.get('lng')

    if zoom is None:
        zoom = 12

    distance = 30

    location_query = Q("geo_distance", 
                            location=f"{lat}, {lng}",
                            distance=f"{distance}km")

    s = s.filter(location_query)

    data = []

    for r in s.scan():
        tmp = {}
        tmp['properties'] = {}
        tmp['geometry'] = {}

        tmp['type'] = 'Feature'
        tmp['properties']['id'] = r['id']
        tmp['properties']['name'] = r['owner']
        tmp['properties']['address'] = r['address']
        tmp['properties']['province'] = r['province']
        tmp['properties']['brand'] = r['brand']
        tmp['properties']['city'] = r['city']
        tmp['geometry']['type'] = 'Point'
        tmp['geometry']['coordinates'] = [float(r['location']['lon']), float(r['location']['lat'])]

        data.append(tmp)

    return JsonResponse(data,status=HTTP_200_OK,safe=False)