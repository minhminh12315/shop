import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.service';

// Interface cho Category (giống serializer Django)
export interface Category {
  id: number;
  name: string;
  products: Product[]; 
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000/api/categories/';

  constructor(private http: HttpClient) {}

  // Lấy tất cả category
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Lấy một category theo id
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}${id}/`);
  }

  // Thêm mới category
  addCategory(data: { name: string }): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, data);
  }

  // Cập nhật category
  updateCategory(id: number, data: { name: string }): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}${id}/`, data);
  }

  // Xóa category
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}${id}/`);
  }
}