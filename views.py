from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import requests
from .models import FavoriteCrypto
from .serializers import UserSerializer, FavoriteCryptoSerializer, CryptoDataSerializer


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': UserSerializer(user).data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'error': f'Registration failed: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            
            if not username or not password:
                return Response({
                    'error': 'Username and password are required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            user = authenticate(username=username, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': UserSerializer(user).data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response({
                    'error': 'Invalid username or password'
                }, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({
                'error': f'Login failed: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CryptoListView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        try:
            # Получаем данные с CoinGecko API
            response = requests.get(
                'https://api.coingecko.com/api/v3/coins/markets',
                params={
                    'vs_currency': 'usd',
                    'order': 'market_cap_desc',
                    'per_page': 100,
                    'page': 1,
                    'sparkline': False
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                # Преобразуем данные для соответствия нашему сериализатору
                crypto_list = []
                for crypto in data:
                    crypto_list.append({
                        'id': crypto.get('id'),
                        'symbol': crypto.get('symbol', '').upper(),
                        'name': crypto.get('name'),
                        'current_price': crypto.get('current_price'),
                        'image': crypto.get('image'),
                        'market_cap': crypto.get('market_cap'),
                        'market_cap_rank': crypto.get('market_cap_rank'),
                        'price_change_24h': crypto.get('price_change_24h'),
                        'price_change_percentage_24h': crypto.get('price_change_percentage_24h'),
                    })
                
                serializer = CryptoDataSerializer(crypto_list, many=True)
                return Response(serializer.data)
            else:
                return Response({'error': 'Failed to fetch crypto data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except requests.RequestException as e:
            return Response({'error': f'API request failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': f'Unexpected error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FavoriteCryptoView(APIView):
    def get(self, request):
        """Получить список избранных криптовалют пользователя"""
        favorites = FavoriteCrypto.objects.filter(user=request.user)
        serializer = FavoriteCryptoSerializer(favorites, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        """Добавить криптовалюту в избранное"""
        crypto_id = request.data.get('crypto_id')
        name = request.data.get('name')
        symbol = request.data.get('symbol')
        current_price = request.data.get('current_price')
        image_url = request.data.get('image_url')
        
        if not all([crypto_id, name, symbol]):
            return Response(
                {'error': 'crypto_id, name, and symbol are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Проверяем, не добавлена ли уже эта криптовалюта
        if FavoriteCrypto.objects.filter(user=request.user, crypto_id=crypto_id).exists():
            return Response(
                {'error': 'Crypto already in favorites'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        favorite = FavoriteCrypto.objects.create(
            user=request.user,
            crypto_id=crypto_id,
            name=name,
            symbol=symbol,
            current_price=current_price,
            image_url=image_url
        )
        
        serializer = FavoriteCryptoSerializer(favorite)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FavoriteCryptoDetailView(APIView):
    def delete(self, request, favorite_id):
        """Удалить криптовалюту из избранного"""
        try:
            favorite = FavoriteCrypto.objects.get(id=favorite_id, user=request.user)
            favorite.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except FavoriteCrypto.DoesNotExist:
            return Response({'error': 'Favorite not found'}, status=status.HTTP_404_NOT_FOUND) 