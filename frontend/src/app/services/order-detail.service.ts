import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderDetail {
  id: number;
  order: number;
  product: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiUrl = 'http://127.0.0.1:8000/api/order-details/';

  constructor(private http: HttpClient) {}

  // Lấy tất cả order details
  getOrderDetails(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(this.apiUrl);
  }

  // Lấy một order detail theo id
  getOrderDetail(id: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}${id}/`);
  }

  // Thêm mới order detail
  addOrderDetail(data: any): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.apiUrl, data);
  }

  // Cập nhật order detail
  updateOrderDetail(id: number, data: any): Observable<OrderDetail> {
    return this.http.put<OrderDetail>(`${this.apiUrl}${id}/`, data);
  }

  // Xóa order detail
  deleteOrderDetail(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}