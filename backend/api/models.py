from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    # ForeignKey: link with other data source
    # models.CASCADE: when we delete a user, delete all related data
    # related_name: a field name to put on each user allowing them to reference all 'notes'
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    def __str__(self):
        return str(self.title)
