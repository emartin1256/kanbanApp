from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task
from .models import my_choices
# Create your views here.


@api_view(['GET'])
def apiOverview():
    api_urls = {
        'List': '/task-list/',
        'Create': '/task-create/',
        'Delete': '/task-delete/<str:pk>/',
        'Update': '/task-update/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def taskList():
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('deleted')
