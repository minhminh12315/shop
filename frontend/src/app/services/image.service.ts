import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface cho Image (tùy theo serializer Django trả về)
export interface Image {
  id: number;
  product: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://127.0.0.1:8000/api/images/';

  constructor(private http: HttpClient) {}

  // Lấy tất cả images
  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
  }

  // Lấy một image theo id
  getImage(id: number): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}${id}/`);
  }

  // Thêm mới image
  addImage(data: FormData): Observable<Image> {
    return this.http.post<Image>(this.apiUrl, data);
  }

  // Cập nhật image
  updateImage(id: number, data: FormData): Observable<Image> {
    return this.http.put<Image>(`${this.apiUrl}${id}/`, data);
  }

  // Xóa image
  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}