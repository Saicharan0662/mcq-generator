from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from .modules.scrapper import Scrapper
from .modules.ner import NER
# Create your views here.


def index(request):
    return HttpResponse("ques maker app")


@csrf_exempt
@api_view(['POST'])
def get_questions(request):
    data = JSONParser().parse(request)
    link = data['link']

    scrapper = Scrapper(link)
    p_tags_data, count = scrapper.get_scrapped_data()
    text = (p_tags_data)

    ner = NER(text)
    questions, options, answers = ner.get_mcq_questions()
    final_questions = ner.format_questions(questions, options, answers)

    return JsonResponse({"data": {"questions": final_questions, "count": len(final_questions)}, "success": True}, status=status.HTTP_200_OK, safe=False)
