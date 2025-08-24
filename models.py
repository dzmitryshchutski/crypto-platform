from django.db import models
from django.contrib.auth.models import User


class FavoriteCrypto(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    crypto_id = models.CharField(max_length=100)  # ID криптовалюты из CoinGecko
    name = models.CharField(max_length=200)
    symbol = models.CharField(max_length=20)
    current_price = models.DecimalField(max_digits=20, decimal_places=8, null=True, blank=True)
    image_url = models.URLField(max_length=500, null=True, blank=True)
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'crypto_id']
        ordering = ['-added_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.name} ({self.symbol})" 