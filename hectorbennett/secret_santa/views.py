import random

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.mail import send_mass_mail

from .forms import SantaFormSet
from .forms import DetailsForm

BASE_SUBJECT = 'Secret Santa'

BASE_MESSAGE = '''Dear {santa},

You have been assigned {giftee} as your giftee.

Good luck, and merry Christmas
Love, Autosanta
Ho Ho Ho
xxx
'''


def success(request):
    '''
    Our form on successful sending
    '''
    return render(request, 'secret_santa/success.html', {})


def failure(request):
    '''
    Our view incase the form fails.
    '''
    return render(request, 'secret_santa/failure.html', {})


def index(request):
    '''
    The main view for our secret-santa app.
    '''
    if request.method == 'POST':
        print('post')
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
        details_form.clean_message()
        create_and_send_emails(santa_forms, details_form)
        return HttpResponseRedirect('success')
    else:
        print('not post')
        initial_details_data = {
            'subject': BASE_SUBJECT,
            'message': BASE_MESSAGE
        }
        santa_forms = SantaFormSet()
        for thing in santa_forms:
            print(thing)
            print(' ')
        details_form = DetailsForm(initial_details_data)
        return render(
            request,
            'secret_santa/index.html',
            {
                'santa_forms': santa_forms,
                'email_details_form': details_form
            }
        )


def create_and_send_emails(santa_form, details_form):
    '''
    Our main function to create and send emails from our form data
    '''
    email_details = details_form.cleaned_data
    subject = email_details.get('subject')
    base_message = email_details.get('message')

    santa_list = get_santa_data(santa_form)
    assignment_list = generate_assignments(santa_list)

    emails = []
    for santa_dict in assignment_list:
        santa = santa_dict['name']
        email = santa_dict['email']
        giftee = santa_dict['giftee']

        message = base_message.format(santa=santa, giftee=giftee)
        email_data = (
            subject,
            message,
            'secret-santa@hectorbennett.com',
            [email]
        )
        emails.append(email_data)
    emails = tuple(emails)
    send_mass_mail(emails, fail_silently=False)


def get_santa_data(santa_form):
    '''
    Converts the santa form data into a list of dictionaries of emails, names
    and giftees.
    '''
    form = santa_form.cleaned_data
    santa_list = []
    for item in form:
        if item.get('santa') and item.get('email_address'):
            santa_list.append({
                'name': item.get('santa'),
                'email': item.get('email_address'),
                'giftee': None
            })
    return santa_list


def assign_giftees(santa_list):
    '''
    Creates a randomised list of pairs from a list of names.
    '''
    giftee_list = []
    for santa in santa_list:
        giftee_list.append(santa['name'])
    random.shuffle(giftee_list)

    for i, giftee in enumerate(giftee_list):
        santa_list[i]['giftee'] = giftee

    return santa_list

def is_derangement(dict_list):
    '''
    Checks if a list of 2-tuples is a derangement, that is, no santa is paired
    with themselves.
    '''
    for santa_dict in dict_list:
        if santa_dict['name'] == santa_dict['giftee']:
            return False
    return True


def generate_assignments(santa_list):
    '''
    Generates a list of valid pairs, santas and giftees.
    '''
    santa_dicts = []
    while True:
        santa_dicts = assign_giftees(santa_list)
        if is_derangement(santa_dicts):
            break
    return santa_dicts
