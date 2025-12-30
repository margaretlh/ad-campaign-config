"""
Contains the `AdministrationAuthenticationMiddleware` responsible for ensuring
all access to the Django Admin site is only done via authenticated and
authorized users.

Classes:
    AdministrationAuthenticationMiddleware
    Methods:
        get_user
"""
from urllib.parse import urlencode

from django.conf import settings
from django.contrib.auth import get_user
from django.http import HttpRequest
from django.shortcuts import redirect


class AdministrationAuthenticationMiddleware:
    """
    On each request / response cycle we check if the "administration" (Django Admin)
    site is trying to be loaded. If it is, then we perform some basic validation
    to ensure it is accessed only by authenticated and authorized users.
    """
    def __init__(self, get_response): # noqa: ANN001
        """
        Initialize the class on boot-up with a standard response and administration
        path.
        """
        self.get_response = get_response
        self.django_admin_path = "/administration/"

    @staticmethod
    def get_user(request: HttpRequest): # noqa: ANN205
        """
        A helper method to obtain the Django `auth_user` from the request.

        Args:
            request: The Django request object.
        """
        return get_user(request)

    def __call__(self, request: HttpRequest):
        """
        The default (Django) middleware process that is executed during each
        request/response cycle.

        Args:
            request: The Django request object.

        Returns:
            HttpResponse | HttpResponseRedirect: Either the next middleware response
            or a redirect.
        """
        if request.path.startswith(self.django_admin_path):
            auth_user = self.get_user(request)

            if auth_user.is_authenticated:
                if auth_user.is_staff:
                    return self.get_response(request)

                # If the user is authenticated but not a staff member.
                return redirect(settings.LOGIN_REDIRECT_URL)

            # Always include the encoded next parameter for unauthenticated users.
            querystring_parameters = urlencode({"next": request.path})
            return redirect(f"{settings.LOGIN_URL}?{querystring_parameters}")

        return self.get_response(request)
