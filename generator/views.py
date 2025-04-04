import os
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.conf import settings
from .models import GeneratedImage, UserPreferences
from .forms import ImageGenerationForm
import openai
from datetime import datetime
from django.contrib.auth.forms import UserCreationForm
import base64

# Configure OpenAI
openai.api_key = "ddc-beta-z3lwk9x0q8-NdIuSUEEjgYxNlLEY09qfQAayBGhX6wkuhy"
openai.api_base = "https://beta.sree.shop/v1"

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, 'Account created successfully! You can now login.')
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

@login_required
def home(request):
    if request.method == 'POST':
        form = ImageGenerationForm(request.POST)
        if form.is_valid():
            image = form.save(commit=False)
            image.user = request.user
            image.save()
            return redirect('generator:image_detail', pk=image.pk)
    else:
        form = ImageGenerationForm()
    
    recent_images = GeneratedImage.objects.filter(user=request.user).order_by('-created_at')[:6]
    return render(request, 'generator/home.html', {'form': form, 'recent_images': recent_images})

@login_required
def generate_image(request):
    """Handle image generation request."""
    if request.method == 'POST':
        form = ImageGenerationForm(request.POST)
        if form.is_valid():
            prompt = form.cleaned_data['prompt']
            style = form.cleaned_data['style']
            resolution = form.cleaned_data['resolution']

            try:
                # Generate image using OpenAI API
                response = openai.Image.create(
                    prompt=f"{prompt} in {style} style",
                    n=1,
                    size=resolution,
                    response_format="b64_json"
                )

                # Get the base64 image data
                image_data = response['data'][0]['b64_json']
                
                # Create a unique filename
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"generated_image_{timestamp}.png"
                
                # Create media directory if it doesn't exist
                media_dir = os.path.join(settings.MEDIA_ROOT, 'generated_images')
                os.makedirs(media_dir, exist_ok=True)
                
                # Save the image file
                filepath = os.path.join(media_dir, filename)
                with open(filepath, "wb") as image_file:
                    image_file.write(base64.b64decode(image_data))
                
                # Create the GeneratedImage object
                image = GeneratedImage.objects.create(
                    user=request.user,
                    prompt=prompt,
                    style=style,
                    resolution=resolution,
                    image_url=f"/media/generated_images/{filename}"
                )

                messages.success(request, 'Image generated successfully!')
                return redirect('generator:image_detail', pk=image.pk)

            except Exception as e:
                messages.error(request, f'Error generating image: {str(e)}')
                return redirect('generator:home')

    return redirect('generator:home')

@login_required
def image_detail(request, pk):
    image = GeneratedImage.objects.get(pk=pk, user=request.user)
    return render(request, 'generator/image_detail.html', {'image': image})

@login_required
def toggle_favorite(request, pk):
    image = GeneratedImage.objects.get(pk=pk, user=request.user)
    image.is_favorite = not image.is_favorite
    image.save()
    return redirect('generator:image_detail', pk=pk)

@login_required
def image_history(request):
    images = GeneratedImage.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'generator/image_history.html', {'images': images})
@login_required
def favorites(request):
    images = GeneratedImage.objects.filter(user=request.user, is_favorite=True).order_by('-created_at')
    return render(request, 'generator/favorites.html', {'images': images})
