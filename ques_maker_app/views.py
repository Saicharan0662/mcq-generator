from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
import jwt
import json
from decouple import config
import datetime
from rest_framework import status
from .modules.scrapper import Scrapper
from .modules.ner import NER
# Create your views here.

MONGO_URI = config("MONGO_URI", cast=str)
DB_NAME = config("DB_NAME", cast=str)
COL_NAME = config("COL_NAME", cast=str)
JWT_ALGO = config("JWT_ALGO", cast=str)
JWT_SECRET = config("JWT_SECRET", cast=str)


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

    return JsonResponse({"data": {"questions": final_questions, "count": len(final_questions)}, "success": True}, status=status.HTTP_200_OK, safe=False)
