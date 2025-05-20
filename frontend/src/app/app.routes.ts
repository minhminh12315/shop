import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
    // {path: '', component: AppComponent},
  { path: 'products', component: ProductListComponent },
  { path: '', component: HomePageComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent}, // chuyển hướng về trang chủ nếu không tìm thấy route
  // có thể thêm các route khác sau
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }