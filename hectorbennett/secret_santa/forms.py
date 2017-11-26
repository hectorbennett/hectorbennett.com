from django import forms


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
        if 'santa' not in message:
            raise forms.ValidationError(('Must include santa tag'), code='error1')
        if 'giftee' not in message:
            raise forms.ValidationError(('Must include giftee tag'), code='error1')
        return message

    def clean(self):
        print('clean')
        cleaned_data = super(DetailsForm, self).clean()
        print('cleaned_data', cleaned_data)
        message = cleaned_data.get("message")
