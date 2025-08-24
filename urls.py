from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    CryptoListView,
    FavoriteCryptoView,
    FavoriteCryptoDetailView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('cryptos/', CryptoListView.as_view(), name='crypto-list'),
    path('favorites/', FavoriteCryptoView.as_view(), name='favorites'),
    path('favorites/<int:favorite_id>/', FavoriteCryptoDetailView.as_view(), name='favorite-detail'),
] 