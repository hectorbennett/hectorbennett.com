from django import forms


class SecretSantaForm(forms.Form):
    
    santa = forms.CharField(
        label='Santa',
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-control'
        })
    )
    email_address = forms.EmailField(
        label='Email address',
        widget=forms.TextInput(attrs={
            'class': 'form-control'
        })
    )

SantaFormSet = forms.formset_factory(
    SecretSantaForm,
    min_num=1,
    validate_min=True,
    extra=2
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
            raise ValidationError("Must include '{santa}' tag in message.")
        if 'giftee' not in message:
            raise ValidationError("Must include '{giftee}' tag in message.")
            
        return message

    def clean(self):
        print('clean')
        cleaned_data = super(DetailsForm, self).clean()
        print('cleaned_data', cleaned_data)
        message = cleaned_data.get("message")

        