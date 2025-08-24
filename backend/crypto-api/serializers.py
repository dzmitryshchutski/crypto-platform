from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FavoriteCrypto


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    email = serializers.EmailField(required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'username': {'min_length': 3},
        }
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class FavoriteCryptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteCrypto
        fields = ('id', 'crypto_id', 'name', 'symbol', 'current_price', 'image_url', 'added_at')
        read_only_fields = ('user', 'added_at')


class CryptoDataSerializer(serializers.Serializer):
    id = serializers.CharField()
    symbol = serializers.CharField()
    name = serializers.CharField()
    current_price = serializers.DecimalField(max_digits=20, decimal_places=8, allow_null=True)
    image = serializers.URLField(allow_null=True)
    market_cap = serializers.DecimalField(max_digits=20, decimal_places=2, allow_null=True)
    market_cap_rank = serializers.IntegerField(allow_null=True)
    price_change_24h = serializers.DecimalField(max_digits=20, decimal_places=8, allow_null=True)
    price_change_percentage_24h = serializers.DecimalField(max_digits=10, decimal_places=2, allow_null=True) 