from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.utils import timezone

def index(request):
    return render(request, 'main/index.html', {})
