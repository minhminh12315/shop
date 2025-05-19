import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  // có thể thêm các route khác sau
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }