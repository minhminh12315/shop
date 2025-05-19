// File: frontend/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// AppComponent (component gốc) - file app.component.ts
import { AppComponent } from './app.component';

// Import routes đã định nghĩa (nếu bạn đã viết app.routes.ts)
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // AppComponent
    // Nếu bạn có thêm các component khác (ví dụ product-list, product-detail, v.v.), gõ thêm ở đây
  ],
  imports: [
    BrowserModule, // nếu dùng SSR, appId phải trùng với server config
    HttpClientModule,
    RouterModule.forRoot(routes), // nếu bạn muốn dùng router. Nếu không, chỉ để BrowserModule, HttpClientModule là đủ
    AppComponent
  ],
  providers: [
    // Các service chung (nếu muốn provide ở cấp module, nhưng thường bạn đã để providedIn: 'root' trong mỗi service)
  ]
})
export class AppModule { }
