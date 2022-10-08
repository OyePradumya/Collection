from django import forms

class EventsForm(forms.Form):


    FirstName = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'FirstName',
    }))

    LastName = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'LastName',
    }))


    MobileNo = forms.CharField(max_length=100, widget=forms.NumberInput(attrs= {
        'class' :  'form-control',
        'placeholder' : 'MobileNo',
    }))

    USN = forms.CharField(max_length=100, widget=forms.TextInput(attrs= {
        'class' : 'form-control',
        'placeholder' : 'USN',
    }))


    ClassID = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'ClassID',
    }))

    EmailID = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'EmailID',
    }))

    TitleClub = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'TitleClub',
    }))

    Skills = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Skills',
    }))