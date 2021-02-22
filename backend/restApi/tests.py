from django.test import TestCase, Client

# Create your tests here.

class ApiTestCase(TestCase):
    def setUp(self):
        pass

    def test_api_response(self):
        c = Client()
        response = c.get('/stations/', {'id': '38877'})
        self.assertEqual(response.status_code, 200)