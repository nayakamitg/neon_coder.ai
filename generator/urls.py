from django.urls import path
from . import views

app_name = 'generator'

urlpatterns = [
    path('', views.home, name='home'),
    path('generate/', views.generate_image, name='generate_image'),
    path('image/<int:pk>/', views.image_detail, name='image_detail'),
    path('image/<int:pk>/toggle-favorite/', views.toggle_favorite, name='toggle_favorite'),
    path('history/', views.image_history, name='image_history'),
    path('favorites/', views.favorites, name='favorites'),
] 