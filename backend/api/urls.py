from django.urls import path, include
from rest_framework import routers
from .views import ProductViewSet
from .views import CategoryViewSet
from .views import ImageViewSet
from .views import OrderViewSet
from .views import OrderDetailViewSet
from .views import RegisterView
from .views import UserInfoView
from .views import SessionLoginView
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'images', ImageViewSet, basename='image')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'order-details', OrderDetailViewSet, basename='order-detail')


urlpatterns = [
    path('', include(router.urls)),
    path('login/', SessionLoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user-info/', UserInfoView.as_view(), name='user-info'),

] 
