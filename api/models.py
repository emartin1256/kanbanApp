from django.db import models

my_choices = (
    ('backlog', 'backlog'),
    ('waiting', 'waiting'),
    ('ongoing', 'inProgres'),
    ('done', 'done'),
)
# Create your models here.
class Task(models.Model):
    title = models.TextField()
    status = models.TextField()
    date = models.DateField()

def __str__(self):
    return self.title
