from django.shortcuts import render
from django.utils import timezone

def index(request):
    return render(request, 'main/index.html', {})


def contact(request):
    return render(request, 'main/contact.html', {})
