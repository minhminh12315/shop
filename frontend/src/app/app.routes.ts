import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: '', component: HomePageComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent}, // chuyển hướng về trang chủ nếu không tìm thấy route
  { path: 'login', component: LoginComponent}, // chuyển hướng về trang chủ nếu không tìm thấy route
  { path: 'register', component: RegisterComponent}, // chuyển hướng về trang chủ nếu không tìm thấy route
  { path: 'cart', component: CartProductComponent}, // chuyển hướng về trang chủ nếu không tìm thấy route
  // có thể thêm các route khác sau
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }