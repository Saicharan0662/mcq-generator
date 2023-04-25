from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('save_questions/', views.save_questions, name='save_questions'),
]
