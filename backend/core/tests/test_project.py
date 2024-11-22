""""
Test Project APIs
"""
from decimal import Decimal
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Project, Category

from core.serializers import ProjectSerializer

PROJECT_URL = reverse('api:project-list')

def details_url(project_id):
    """returns details of a project"""
    return reverse('api:project-detail', args=[project_id])

def create_project(user, **params):
    """Create and return a sample Project"""

    category = Category.objects.create(title='project_name')

    defaults = {
        'title': "E-Commerce Website",
        'description': 'This is an E-Commerce Site',
        'keywords': 'E-commerce, Online',
        'co_authors': 'E-commerce, Online',
        'project_content': 'htttps//example.com/project.pdf',
        'table_of_content': 'htttps//example.com/project.pdf'
    }

    defaults.update(**params)

    project = Project.objects.create(author=user, category=category, 
                                     **defaults)
    return project


class PublicProjectAPITests(TestCase):
    """Test unauthenticated API requests"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_not_required(self):
        """Test auth is required to call API"""

        res = self.client.get(PROJECT_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_retrieve_project(self):
        """Test to see if project details can be retrieved when not logged in"""

        user = get_user_model().objects.create_user(
            email="test@example.com",
            password="password123"
        )
        project = create_project(user=user)

        url = details_url(project.id)
        res = self.client.get(url)

        serializer = ProjectSerializer(project)

        self.assertEqual(res.status_code, status.HTTP_200_OK)