from django import forms

class RequiredFormSet(forms.BaseFormSet):
    def __init__(self, *args, **kwargs):
        super(RequiredFormSet, self).__init__(*args, **kwargs)
        for form in self.forms:
            form.empty_permitted = False

    def clean_formset(self):
        print('clean formset')
        print(self.forms)

class SecretSantaForm(forms.Form):

    santa = forms.CharField(
        required=True,
        label='Santa',
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-control'
        })
    )

    email_address = forms.EmailField(
        required=True,
        label='Email address',
        widget=forms.TextInput(attrs={
            'class': 'form-control'
        })
    )

SantaFormSet = forms.formset_factory(
    SecretSantaForm,
    min_num=2,
    validate_min=True,
    formset=RequiredFormSet
)

class DetailsForm(forms.Form):

    subject = forms.CharField(
        label='Subject',
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-control'
        })
    )
    message = forms.CharField(widget=forms.Textarea(attrs={
        'class': 'form-control'
    }))

    def clean_message(self):
        message = self.cleaned_data['message']
        if '{santa}' not in message:
            raise forms.ValidationError(('{santa} tag not included in message'), code='error1')
        if '{giftee}' not in message:
            raise forms.ValidationError(('{giftee} tag not included in message'), code='error2')
        return message
