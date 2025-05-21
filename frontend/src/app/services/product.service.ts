import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from './image.service';

// Tạo interface cho Product (giống với serializer Django)
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: number;
  category_name: string;
  images: Image[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Địa chỉ API Django (chỉnh lại nếu khác cổng/domain)
  private apiUrl = 'http://127.0.0.1:8000/api/products/';

  constructor(private http: HttpClient) {}

  // Lấy tất cả product
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Lấy một product theo id
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${id}/`);
  }

  // Tạo mới
  addProduct(data: { name: string; price: number; category_id: number }): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  // Cập nhật
  updateProduct(id: number, data: { name: string; price: number }): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}${id}/`, data);
  }

  // Xóa
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${id}/`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${categoryId}`);
  }
}
