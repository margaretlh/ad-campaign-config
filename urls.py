from django_prometheus import exports

from django.conf import settings
from django.contrib import admin
from django.urls import include, path

from apps.campaign_notes.views import campaign_notes
from crossroads import views


ADMIN_DESCRIPTION = f"{settings.SITE_TITLE} | Administration"

admin.autodiscover()
admin.site.site_header = ADMIN_DESCRIPTION
admin.site.site_title = ADMIN_DESCRIPTION
admin.site.index_title = f"Welcome to {ADMIN_DESCRIPTION}..."
admin.site.enable_nav_sidebar = False


urlpatterns = [
    path("accounting/", include("apps.accounting.urls", namespace="accounting")),
    path("admin/", include("apps.admin.urls", namespace="crossroads_admin")),
    path("ai_ml/", include("apps.ai_ml.urls")),
    path("ao/", include("apps.account_open.urls")),
    path("api/", include("api.urls")),
    path("bug_report/", include("apps.bug_report.urls")),
    path("campaign_notes/", campaign_notes),
    path("campaign_request/", include("apps.campaign_request.urls")),
    path("compliance_checks/", include("apps.blacklist.urls", namespace="blacklist")),
    path("display/", include("apps.display_reporting.urls", namespace="display_reporting")),
    path("docs/", include("apps.docs.urls")),
    path("email/", include("apps.email_reporting.urls", namespace="email_reporting")),
    path("kw_reports/", include("apps.kw_reports.urls", namespace="crossroads_kw_reports")),
    path("notifications/", include("apps.notifications.urls", namespace="notifications")),
    path("notify/", include("apps.notify.urls", namespace="notify")),
    path("search/", include("apps.search_reporting.urls", namespace="search_reporting")),
    path("select2/", include("django_select2.urls")),
    path("settings/", include("apps.user_settings.urls")),
    path("signup/", include("apps.signup.urls")),
    path("sl_reports/", include("apps.sl_reports.urls")),
    path("sponsored_links/", include("apps.sponsored_links_reporting.urls", namespace="sponsored_links")),
    path("oops/", views.cause_a_problem),
    path("ops/", include("apps.operations.urls")),
    path("ping/", views.health_check),
    path("publisher_notes/", include("apps.publisher_notes_vue.urls")),
    path("releases/", include("releases.urls")),
    path("whitelabel/", include("apps.whitelabel.urls", namespace="whitelabel")),
    path("prometheus/metrics/", exports.ExportToDjangoView, name="prometheus-metrics"),
    path("", include("apps.main_app.urls")),
    # Django admin urls.
    path("administration/", include([
        path("defender/", include("defender.urls")),
        path("doc/", include("django.contrib.admindocs.urls")),
        path("", admin.site.urls)
    ]))
]


# Custom error handlers.
handler404 = views.handler404
handler500 = views.handler500
