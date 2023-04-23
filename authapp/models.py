from django.db import models

# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True, db_column='_id')
    username = models.CharField(max_length=50)
    useremail = models.EmailField(max_length=50)
    userpassword = models.CharField(max_length=100)
