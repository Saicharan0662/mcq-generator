import pymongo
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from .models import User
from bson.json_util import dumps
import json
from decouple import config

MONGO_URI = config("MONGO_URI", cast=str)
DB_NAME = config("DB_NAME", cast=str)
COL_NAME = config("COL_NAME", cast=str)
client = pymongo.MongoClient(
    MONGO_URI)
dbname = client[DB_NAME]
collection = dbname[COL_NAME]

# Create your views here.


def index(request):
    return HttpResponse("Hello, world. You're at the authapp index.")


@csrf_exempt
@api_view(['POST'])
def register(request):
    user_data = JSONParser().parse(request)
    user_serializer = UserSerializer(data=user_data)

    user = collection.find_one({"useremail": user_data['useremail']})
    if user:
        return JsonResponse("Email already registered", status=status.HTTP_400_BAD_REQUEST, safe=False)
    if user_serializer.is_valid():
        user_serializer.save()
        collection.insert_one(user_data)
        return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED, safe=False)

    return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
@api_view(['POST'])
def login(request):
    user_data = JSONParser().parse(request)

    user = collection.find_one(
        {"useremail": user_data['useremail']})

    if user:
        user = json.loads(dumps(dict(user)))
        if user['userpassword'] == user_data['userpassword']:
            return JsonResponse("Login successful", status=status.HTTP_200_OK, safe=False)
        return JsonResponse("Incorrect password", status=status.HTTP_400_BAD_REQUEST, safe=False)
    return JsonResponse("User not found", status=status.HTTP_404_NOT_FOUND, safe=False)
