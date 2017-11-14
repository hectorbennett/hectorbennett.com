from django.shortcuts import render
from django.utils import timezone
# from .models import PageContent
# from .models import Artwork


def index(request):
    # page_content = PageContent.objects.filter(name='home_text').first()
    return render(request, 'main/index.html', {})


# def contact(request):
#     contact_info = PageContent.objects.filter(name='contact_info').first()
#     return render(request, 'main/contact.html', {'contact_info': contact_info})