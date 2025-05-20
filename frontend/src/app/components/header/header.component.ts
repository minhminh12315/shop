import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule
  ],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  logedIn: boolean = false;
  constructor(private router: Router) {}

  // lấy ra localStorage kiểm tra xem đã đăng nhập hay chưa
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  ngOnInit() {
    
  }
}
