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
        super(DetailsForm, self).__init__(user,*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'

    subject = forms.CharField(label='Subject', max_length=100)
    message = forms.CharField(widget=forms.Textarea)
