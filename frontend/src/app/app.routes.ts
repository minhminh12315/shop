import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    // {path: '', component: AppComponent},
  { path: 'products', component: ProductListComponent },
  { path: '', component: HomePageComponent },
  // có thể thêm các route khác sau
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }