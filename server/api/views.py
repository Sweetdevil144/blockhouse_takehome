from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view
import json
import os
module_dir = os.path.dirname(__file__)

@api_view(['GET'])
def index(request):
    return JsonResponse({'message':'server_started'})

@api_view(['GET'])
def pie_chart(request):
    data=json.loads(open(os.path.join(module_dir,'data/piechart.json'),"r").read())
    return JsonResponse({'result':data})

@api_view(['GET'])
def line_chart(request):
    data=json.loads(open(os.path.join(module_dir,'data/linechart.json'),"r").read())
    return JsonResponse({'result':data})

@api_view(['GET'])
def bar_chart(request):
    data=json.loads(open(os.path.join(module_dir,'data/barchart.json'),"r").read())
    return JsonResponse({'result':data})

@api_view(['GET'])
def candlestick(request):
    data=json.loads(open(os.path.join(module_dir,'data/candlestick.json'),"r").read())
    return JsonResponse({'result':data})
