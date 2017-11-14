from django import forms


class SecretSantaForm(forms.Form):
    santa = forms.CharField(label='Santa', max_length=100)
    email_address = forms.EmailField(label='Email address')

class DetailsForm(forms.Form):
    subject = forms.CharField(label='Subject', max_length=100)

SantaFormSet = forms.formset_factory(SecretSantaForm, extra=3)
