from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.response import Response

class ApiTests(APITestCase):

    def test_index(self):
        """Test for the index endpoint"""
        url = reverse('index')
        response: Response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), {'message': 'server_started'})

    def test_pie_chart(self):
        """Test for the pie chart data endpoint"""
        url = reverse('pie_chart')
        response: Response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = {
            "labels": ["Red", "Blue", "Yellow"],
            "data": [300, 50, 100]
        }
        self.assertEqual(response.json(), {'result': expected_data})

    def test_line_chart(self):
        """Test for the line chart data endpoint"""
        url = reverse('line_chart')
        response: Response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = {
            "labels": ["January", "February", "March"],
            "data": [10, 20, 30]
        }
        self.assertEqual(response.json(), {'result': expected_data})

    def test_bar_chart(self):
        """Test for the bar chart data endpoint"""
        url = reverse('bar_chart')
        response: Response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = {
            "model": ["Product A", "Product B", "Product C"],
            "sales": [100, 200, 300]
        }
        self.assertEqual(response.json(), {'result': expected_data})

    def test_candlestick_chart(self):
        """Test for the candlestick data endpoint"""
        url = reverse('candlestick')
        response: Response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = {
            "data": [
                {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
                {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40}
            ]
        }
        self.assertEqual(response.json(), {'result': expected_data})

    def test_pie_chart_method_not_allowed(self):
        """Test for method not allowed on pie chart data endpoint (POST instead of GET)"""
        url = reverse('pie_chart')
        response: Response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)