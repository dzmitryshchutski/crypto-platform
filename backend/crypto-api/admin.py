from django.contrib import admin
from .models import FavoriteCrypto


@admin.register(FavoriteCrypto)
class FavoriteCryptoAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'symbol', 'current_price', 'added_at')
    list_filter = ('added_at', 'symbol')
    search_fields = ('user__username', 'name', 'symbol')
    readonly_fields = ('added_at',) 