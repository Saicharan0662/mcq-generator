from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('save_questions/', views.save_questions, name='save_questions'),
    path('get_questions/', views.get_questions, name='get_questions'),
    path('delete_question/<qId>', views.delete_question, name='delete_question'),
]
