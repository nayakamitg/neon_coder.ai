from django import forms
from .models import GeneratedImage, UserPreferences

class ImageGenerationForm(forms.ModelForm):
    STYLE_CHOICES = [
        ('realistic', 'Realistic'),
        ('artistic', 'Artistic'),
        ('cartoon', 'Cartoon'),
        ('anime', 'Anime'),
        ('oil-painting', 'Oil Painting'),
        ('watercolor', 'Watercolor'),
        ('digital-art', 'Digital Art'),
        ('3d-render', '3D Render'),
    ]

 

    prompt = forms.CharField(
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'placeholder': 'Describe the image you want to generate...',
            'rows': 3
        })
    )
    style = forms.ChoiceField(
        choices=STYLE_CHOICES,
        widget=forms.Select(attrs={'class': 'form-control'})
    )
   

    class Meta:
        model = GeneratedImage
        fields = ['prompt', 'style']

class UserPreferencesForm(forms.ModelForm):
    class Meta:
        model = UserPreferences
        fields = ['default_style']
        widgets = {
            'default_style': forms.Select(attrs={'class': 'form-control'}),
           
        } 