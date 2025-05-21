import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id: number;
  user: number;
  order_date: string;
  address: string;
  phone_number: number;
  total_amount: number;
  payment_method: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://127.0.0.1:8000/api/orders/';

  constructor(private http: HttpClient) {}

  // Lấy tất cả orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Lấy một order theo id
  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}${id}/`);
  }

  // Thêm mới order
  addOrder(data: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, data);
  }

  // Cập nhật order
  updateOrder(id: number, data: any): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}${id}/`, data);
  }

  // Xóa order
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}