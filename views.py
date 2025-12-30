from django.http import HttpResponse
from django.shortcuts import render


def health_check(request):
    """
    AWS ALB Status Checks. Can also be used to check if the system is responding.
    """
    return HttpResponse()


def handler404(request, exception):
    return render(request, 'error_pages/404.html', status=404)


def handler500(request):
    return render(request, 'error_pages/500.html', status=500)


def cause_a_problem(request):
    html = (
        '<html>'
        '<body>'
        '<a href="https://sectgaim.com/c/9z1K362VdM64WrAg?src=1t">secure</a>'
        '<br>'
        '<a href="http://links.dealsnoops.com/c/e3dA5DOW2YDrMJxG?src=1t">insecure</a>'
        '</body>'
        '</html'
    )
    return HttpResponse(html)
