import pymongo
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import jwt
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from .models import User
from bson.json_util import dumps
import json
from decouple import config
import datetime

MONGO_URI = config("MONGO_URI", cast=str)
DB_NAME = config("DB_NAME", cast=str)
COL_NAME_USER = config("COL_NAME_USER", cast=str)
JWT_ALGO = config("JWT_ALGO", cast=str)
JWT_SECRET = config("JWT_SECRET", cast=str)
JWT_EXP = config("JWT_EXP", cast=int)

client = pymongo.MongoClient(
    MONGO_URI)
dbname = client[DB_NAME]
collection = dbname[COL_NAME_USER]

# Create your views here.


def index(request):
    return HttpResponse("Hello, world. You're at the authapp index.")


@csrf_exempt
@api_view(['POST'])
def register(request):
    user_data = JSONParser().parse(request)
    user_data['userpassword'] = make_password(user_data['userpassword'])
    user_serializer = UserSerializer(data=user_data)
    user = collection.find_one({"useremail": user_data['useremail']})

    if user:
        return JsonResponse({"msg": "Email already registered", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)
    if user_serializer.is_valid():
        user_serializer.save()
        collection.insert_one(user_data)
        return JsonResponse({"msg": "User registered successfully", "success": True}, status=status.HTTP_201_CREATED, safe=False)

    return JsonResponse({"err": user_serializer.errors, "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
@api_view(['POST'])
def login(request):
    user_data = JSONParser().parse(request)

    user = collection.find_one(
        {"useremail": user_data['useremail']})

    if user:
        user = json.loads(dumps(dict(user)))
        isMatch = check_password(
            user_data['userpassword'], user['userpassword'])
        if isMatch:
            token = jwt.encode({
                "userID": user['_id']['$oid'],
                "username": user['username'],
                "useremail": user['useremail'],
                "expiresIn": dumps(datetime.datetime.utcnow() + datetime.timedelta(days=JWT_EXP)),
            },
                JWT_SECRET, algorithm=JWT_ALGO)
            return JsonResponse({
                "user": {
                    "username": user['username'],
                    "useremail": user['useremail'],
                    "token": token.decode('utf-8')
                }, "msg": "Login successfull", "success": True
            }, status=status.HTTP_200_OK, safe=False)
        return JsonResponse({"msg": "Incorrect password", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)
    return JsonResponse({"msg": "User not found", "success": False}, status=status.HTTP_404_NOT_FOUND, safe=False)
