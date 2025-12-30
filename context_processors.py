"""
The context processors module used for supplying additional template context to
the frontend.
"""
from django.conf import settings
from django.http import HttpRequest

from releases.utilities import get_latest_release


def template_context(request: HttpRequest) -> dict: # noqa: ARG001
    """
    Here are a couple of template variables that are used in the front-end
    templates and are available in every request / response.

    Args:
        request: The Django request.

    Returns:
        A dictionary containing variables available in all templates.
    """
    template_variables = {
        "release": {
            "version": get_latest_release()
        }
    }
    if settings.RELEASES == "development":
        template_variables["release"]["environment"] = "development"
    elif settings.RELEASES == "staging":
        template_variables["release"]["environment"] = "staging"
    else:
        template_variables["release"]["environment"] = "production"
    return template_variables
