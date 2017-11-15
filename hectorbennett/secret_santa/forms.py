from django import forms


class SecretSantaForm(forms.Form):
    santa = forms.CharField(label='Santa', max_length=100)
    email_address = forms.EmailField(label='Email address')


SantaFormSet = forms.formset_factory(
    SecretSantaForm,
    min_num=1,
    validate_min=True,
    extra=2
)


class DetailsForm(forms.Form):
    subject = forms.CharField(label='Subject', max_length=100)
    message = forms.CharField(widget=forms.Textarea)
