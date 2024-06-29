from django.urls import path
from api.views import CreateUserView, NoteListCreateView, NoteDeleteView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    # User API routes
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),

    # Note API routes
    path('notes/', NoteListCreateView.as_view(), name='list_note'),
    path('notes/delete/<int:pk>', NoteDeleteView.as_view(), name='delete_note')
]
