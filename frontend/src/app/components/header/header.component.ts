import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, HttpClientModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartCount: number = 0;
  logedIn: boolean = false;
  constructor(
    private router: Router,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  isLoggedIn(): boolean {
    // this.http
    //   .get('http://127.0.0.1:8000/api/user-info/', { withCredentials: true })
    //   .subscribe({
    //     next: (user) => {
    //       console.log('User info:', user);
    //       this.logedIn = true;
    //     },
    //     error: () => {
    //       console.error('Lỗi khi lấy thông tin người dùng');
    //     },
    //   });

      return this.logedIn;
  }

  ngOnInit() {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  logout() {
    this.http
      .post('http://127.0.0.1:8000/api/logout/', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          this.router.navigate(['/login']);
        },
      });
    this.router.navigate(['/login']);
  }
}
