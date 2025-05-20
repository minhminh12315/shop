import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private router: Router, private http: HttpClient) {}


  onRegister() {
    this.error = '';

    if (this.password !== this.confirmPassword) {
      this.error = 'Mật khẩu không khớp!';
      return;
    }

    this.http
      .post<any>('http://127.0.0.1:8000/api/register/', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
          console.log(res);
        },
        error: () => {
          this.error = 'Đăng ký không thành công!';
        },
      });
  }
}
