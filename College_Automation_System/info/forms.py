from django import forms

class FeedbackForm(forms.Form):


    ClassId = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'ClassId',
    }))


    Question1 = forms.CharField(max_length=100, widget=forms.NumberInput(attrs= {
        'class' :  'form-control',
        'placeholder' : 'Question1',
    }))

    Question2 = forms.CharField(max_length=100, widget=forms.TextInput(attrs= {
        'class' : 'form-control',
        'placeholder' : 'Question2'
    }
                                                                          ))
    Question3 = forms.CharField(max_length=100, widget=forms.NumberInput(attrs={
        'class': 'form-control',
        'placeholder': 'Question3'
    }))

    Question4 = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Question4'
    }))

    Question5 = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Question5'
    }))

    Question6 = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Question6'
    }))

    Question7 = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Question7'
    }))