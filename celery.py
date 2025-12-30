import os

from celery import Celery

from django.conf import settings

# Production
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "crossroads.settings.production")

app = Celery(
    "crossroads",
    backend=settings.CELERY_RESULT_BACKEND,
    broker=settings.BROKER_URL,
)

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object("django.conf:settings")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
