from django.test import TestCase, Client
from django.conf import settings
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from rest_framework.authtoken.models import Token
from .models import Event, Theme
from .serializers import EventSerializer, ThemeSerializer
from .rest_views import EventViewSet
from users.models import CustomUser

# Create your tests here.
class EventTest(APITestCase):
    """ Test module for Event model """
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = CustomUser.objects.create(username='kphan')
        self.token = Token.objects.create(user=self.user)
        

    def test_event_creation(self):
        url = reverse('event-list')
        data = {
            "title": "Test",
            "desc": "",
            "date_occurring": None,
            "capacity": 0,
            "price": None,
            "is_recurring": False,
            "recurring_duration": None,
            "is_public": False,
            "image": None
        }
        view = EventViewSet.as_view({'post': 'create'})
        request = self.factory.post(url, data=data, format='json')
        force_authenticate(request, user=self.user, token=self.token)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['is_public'], self.user.is_superuser and data['is_public'])
        self.assertEqual(int(response.data['creator'].split('/')[-2]), self.user.id)
        
        