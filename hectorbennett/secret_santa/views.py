from django.shortcuts import render
from django.http import HttpResponseRedirect

from .forms import SantaFormSet
from .forms import DetailsForm

import random


def success(request):
    return render(request, 'success.html', {})


def index(request):
    if request.method == 'POST':
        santa_forms = SantaFormSet(request.POST)
        details_form = DetailsForm(request.POST)
        if santa_forms.is_valid() and details_form.is_valid():
            print('valid')
            print(create_and_send_emails(santa_forms, details_form))
            return render(request, 'success.html', {})
        else:
            return HttpResponseRedirect('you failed lol')
    else:
        print('not POST')
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

def send_email(user, password, recipient, subject, body):
    """
    Sends an email with gmail.
    """

    message = """From: {user}\nTo: {recipient}\nSubject: {subject}\n\n{body}
    """.format(user=user, recipient=recipient, subject=subject, body=body)

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.login(user, password)
        server.sendmail(user, recipient, message)
        server.close()
        print('successfully sent the mail')
    except:
        print('failed to send mail')

def create_and_send_emails(santa_form, details_form):
    email_details = details_form.cleaned_data
    santa_list = list_from_form(santa_form)
    assignment_list = generate_assignments(santa_list)
    email_subject = email_details.get('subject')

    message = """Dear {santa},

        You have been assigned {giftee} as your giftee.

        Good luck, and merry Christmas

        Love, Autosanta
        Ho Ho Ho
        xxx
        """


    for santa, giftee in assignment_list:
        print(message.format(santa=santa, giftee=giftee))
        # send_email(
        #     username,
        #     password,
        #     santa_email,
        #     email_subject,
        #     email_content
        # )


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
