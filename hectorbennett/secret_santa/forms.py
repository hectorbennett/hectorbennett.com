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

    def __init__(self, user, *args, **kwargs):
        super(DetailsForm, self).__init__(user, *args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'

    subject = forms.CharField(label='Subject', max_length=100)
    message = forms.CharField(widget=forms.Textarea)

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

        