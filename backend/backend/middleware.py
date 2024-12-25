from django.http import HttpResponseNotFound

class FallbackMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if response.status_code == 404:
            # Customize fallback response
            return HttpResponseNotFound("<h1>404 - Page Not Found</h1><p>Sorry, this page doesn't exist.</p>")
        return response

