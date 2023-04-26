from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import QuestionSerializer
import jwt
import json
from bson import ObjectId
from bson.json_util import dumps
from decouple import config
import datetime
import pymongo
from rest_framework import status
from .modules.scrapper import Scrapper
from .modules.ner import NER
# Create your views here.

MONGO_URI = config("MONGO_URI", cast=str)
DB_NAME = config("DB_NAME", cast=str)
COL_NAME_QUESTION = config("COL_NAME_QUESTION", cast=str)
JWT_ALGO = config("JWT_ALGO", cast=str)
JWT_SECRET = config("JWT_SECRET", cast=str)

client = pymongo.MongoClient(
    MONGO_URI)
dbname = client[DB_NAME]
collection = dbname[COL_NAME_QUESTION]


def index(request):
    return HttpResponse("ques maker app")


@csrf_exempt
@api_view(['POST'])
def save_questions(request):
    data = JSONParser().parse(request)
    link = data['link']
    title = data['title']
    description = data['description']
    tags = data['tags'].split(',')
    for i in range(len(tags)):
        tags[i] = tags[i].strip()

    # Authorization
    token = request.META.get('HTTP_AUTHORIZATION')
    if (token == "null") or (not token.startswith('Bearer ')):
        return JsonResponse({"msg": "Please provide a valid token", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    token = token.split(' ')[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGO)
        userID = payload['userID']
        expires_in = json.loads(payload['expiresIn'])
        expires_in = datetime.datetime.strptime(
            expires_in['$date'], '%Y-%m-%dT%H:%M:%S.%fZ')
    except:
        return JsonResponse({"msg": "Please provide a valid token", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    if expires_in < datetime.datetime.utcnow():
        return JsonResponse({"msg": "Token expired", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    # Scrapping data
    scrapper = Scrapper(link)
    p_tags_data, count = scrapper.get_scrapped_data()
    text = (p_tags_data)

    # Generating questions
    ner = NER(text)
    questions, options, answers = ner.get_mcq_questions()
    final_questions = ner.format_questions(questions, options, answers)

    if len(final_questions) == 0:
        return JsonResponse({"msg": "No questions found", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    # Saving questions in database
    question_data = {
        "title": title,
        "description": description,
        "tags": json.dumps(tags),
        "questions": json.dumps(final_questions),
        "createdBy": userID
    }

    try:
        question_serializer = QuestionSerializer(data=question_data)
        print(question_serializer.is_valid())
        if question_serializer.is_valid():
            question_serializer.save()
            collection.insert_one(question_serializer.data)
            return JsonResponse({"data": {"questions": final_questions, "count": len(final_questions)}, "success": True}, status=status.HTTP_200_OK, safe=False)
    except Exception as e:
        print(e)
        return JsonResponse({"msg": "Something went wrong", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    return JsonResponse({"msg": "Something went wrong", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)


@api_view(['GET'])
def get_questions(request):
    # Authorization
    token = request.META.get('HTTP_AUTHORIZATION')
    if (token == "null") or (not token.startswith('Bearer ')):
        return JsonResponse({"msg": "Please provide a valid token", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    token = token.split(' ')[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGO)
        userID = payload['userID']
        expires_in = json.loads(payload['expiresIn'])
        expires_in = datetime.datetime.strptime(
            expires_in['$date'], '%Y-%m-%dT%H:%M:%S.%fZ')
    except:
        return JsonResponse({"msg": "Please provide a valid token", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    if expires_in < datetime.datetime.utcnow():
        return JsonResponse({"msg": "Token expired", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    try:
        questions = collection.find({"createdBy": userID})
        questions = json.loads(dumps(list(questions)))
        for question in questions:
            question['questions'] = json.loads(question['questions'])
            question['tags'] = json.loads(question['tags'])

        return JsonResponse({"data": questions, "success": True}, status=status.HTTP_200_OK, safe=False)
    except Exception as e:
        return JsonResponse({"msg": "Something went wrong", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    return JsonResponse({"msg": "Something went wrong", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)


@api_view(['DELETE', 'GET'])
def delete_getsingle_question(request, qId):
    # Authorization
    token = request.META.get('HTTP_AUTHORIZATION')
    if (token == "null") or (not token.startswith('Bearer ')):
        return JsonResponse({"msg": "Please provide a valid token", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    token = token.split(' ')[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGO)
        userID = payload['userID']
        expires_in = json.loads(payload['expiresIn'])
        expires_in = datetime.datetime.strptime(
            expires_in['$date'], '%Y-%m-%dT%H:%M:%S.%fZ')
    except:
        return JsonResponse({"msg": "Please provide a valid token", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    if expires_in < datetime.datetime.utcnow():
        return JsonResponse({"msg": "Token expired", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    if request.method == 'DELETE':
        try:
            questions = collection.delete_one({"_id": ObjectId(qId)})
            return JsonResponse({"msg": "Questions deleted successfully", "success": True}, status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            return JsonResponse({"msg": "Question not found", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

        return JsonResponse({"msg": "Something went wrong", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    if request.method == 'GET':
        try:
            questions = collection.find_one({"_id": ObjectId(qId)})
            questions['_id'] = str(questions['_id'])
            questions['questions'] = json.loads(questions['questions'])
            questions['tags'] = json.loads(questions['tags'])
            return JsonResponse({"data": questions, "success": True}, status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            return JsonResponse({"msg": "Question not found", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

        return JsonResponse({"msg": "Something went wrong", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)


@api_view(['PATCH'])
def update_question(request):
    # Authorization
    token = request.META.get('HTTP_AUTHORIZATION')
    if (token == "null") or (not token.startswith('Bearer ')):
        return JsonResponse({"msg": "Please provide a valid token", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    token = token.split(' ')[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGO)
        userID = payload['userID']
        expires_in = json.loads(payload['expiresIn'])
        expires_in = datetime.datetime.strptime(
            expires_in['$date'], '%Y-%m-%dT%H:%M:%S.%fZ')
    except:
        return JsonResponse({"msg": "Please provide a valid token", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    if expires_in < datetime.datetime.utcnow():
        return JsonResponse({"msg": "Token expired", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    try:
        data = JSONParser().parse(request)
        qId = data['questionID']
        title = data['title']
        description = data['description']
        tags = data['tags'].split(',')
        for i in range(len(tags)):
            tags[i] = tags[i].strip()

        questions = collection.find_one({"_id": ObjectId(qId)})
        collection.update_one({"_id": ObjectId(qId)}, {"$set": {
            "title": title,
            "description": description,
            "tags": json.dumps(tags),
            "questions": questions['questions'],
            "createdBy": questions['createdBy'],
        }})
        return JsonResponse({"msg": "Question updated successfully", "success": True}, status=status.HTTP_200_OK, safe=False)
    except Exception as e:
        # print(e)
        return JsonResponse({"msg": "Something went wrong", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    return JsonResponse({"msg": "Something went wrong", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)
