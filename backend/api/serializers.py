from rest_framework import serializers
from .models import Product
from .models import Category
from .models import Image
from .models import Order
from .models import OrderDetail
from django.contrib.auth.models import User

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image', 'product']
        read_only_fields = ['id']
        extra_kwargs = {
            'image': {'required': True},
            'product': {'required': True}
        }

class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )
    category_name = serializers.CharField(source='category.name', read_only=True)  # Thêm dòng này


    class Meta:
        model = Product
        fields = ['id', 'name', 'price','description', 'category','category_name', 'images']
        read_only_fields = ['id']
        extra_kwargs = {
            'name': {'required': True},
            'price': {'required': True},
            'description': {'required': True},
            'category': {'required': True},
        }

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'products']
        read_only_fields = ['id']
        extra_kwargs = {
            'name': {'required': True}
        }

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user','address','phone_number','payment_method','status', 'total_amount', 'order_date']
        read_only_fields = ['id', 'order_date']
        extra_kwargs = {
            'user': {'required': True}
        }

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ['id', 'order', 'product', 'quantity']
        read_only_fields = ['id']
        extra_kwargs = {
            'order': {'required': True},
            'product': {'required': True},
            'quantity': {'required': True}
        }

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


