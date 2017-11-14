from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.mail import send_mail

from .forms import SantaFormSet
from .forms import DetailsForm

import random


def success(request):
    return render(request, 'success.html', {})


def failure(request):
    return render(request, 'failure.html', {})


def index(request):
    if request.method == 'POST':
        santa_forms = SantaFormSet(request.POST)
        details_form = DetailsForm(request.POST)
        if not santa_forms.is_valid():
            print('santa form not valid')
            print(santa_forms.errors)
            return HttpResponseRedirect('failure')
        elif not details_form.is_valid():
            print('details form not valid')
            print(details_form.errors)
            return HttpResponseRedirect('failure')
        else:
            create_and_send_emails(santa_forms, details_form)
            return HttpResponseRedirect('success')
    else:
        santa_forms = SantaFormSet()
        details_form = DetailsForm()
        return render(
            request,
            "index.html",
            {
                'santa_forms': santa_forms,
                'email_details_form': details_form
            }
        )


def create_and_send_emails(santa_form, details_form):
    email_details = details_form.cleaned_data
    santa_list = list_from_form(santa_form)
    assignment_list = generate_assignments(santa_list)
    subject = email_details.get('subject')

    base_message = """Dear {santa},

        You have been assigned {giftee} as your giftee.

        Good luck, and merry Christmas

        Love, Autosanta
        Ho Ho Ho
        xxx
        """

    for santa, giftee in assignment_list:
        message = base_message.format(santa=santa, giftee=giftee)
        send_mass_email(
            (subject, message, from, recipient),
            fail_silently=False,
            auth_user=None,
            auth_password=None,
            connection=None
        )


def list_from_form(form):
    form = form.cleaned_data
    print(form)
    santa_list = []
    for item in form:
        if item.get('santa') and item.get('email_address'):
            santa_list.append(item['santa'])

    return santa_list


def create_pairs(santa_list):
    giftee_list = list(santa_list)
    random.shuffle(giftee_list)
    return list(zip(santa_list, giftee_list))


def is_derangement(tuple_list):
    for i, j in tuple_list:
        if i == j:
            return False
    return True


def generate_assignments(santa_list):
    assignment_list = []
    while True:
        assignment_list = create_pairs(santa_list)
        if is_derangement(assignment_list):
            break
    return assignment_list
