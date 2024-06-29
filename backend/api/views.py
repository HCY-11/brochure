from django.contrib.auth.models import User
from rest_framework import generics
from .models import Note
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    # Set of all users to look at when creating a new one (to ensure no duplicates)
    queryset = User.objects.all()

    # Class that stores the serialized (JSON) data
    serializer_class = UserSerializer

    # Who has permissions to use this view?
    permission_classes = [ AllowAny ]


class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer

    permission_classes = [ IsAuthenticated ]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDeleteView(generics.DestroyAPIView):
    serializer_class = NoteSerializer

    permission_classes = [ IsAuthenticated ]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
