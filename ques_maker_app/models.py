from django.db import models


# Create your models here.


class Question(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    tags = models.TextField()
    questions = models.TextField()
    createdBy = models.CharField(max_length=50, default='000000')
