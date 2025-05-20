import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,

})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  constructor(private http: HttpClient, private router: Router) {}

  // Hàm xử lý khi người dùng nhấn nút đăng nhập
  onLogin() {
    this.error = '';
    this.http.post<any>('http://127.0.0.1:8000/api/login/', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        // Lưu token nếu có
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        console.log(res);
      },
      error: () => {
        this.error = 'Sai tài khoản hoặc mật khẩu!';
      }
    });

    // console.log('Username:', this.username);
    // console.log('Password:', this.password);
  }
}
