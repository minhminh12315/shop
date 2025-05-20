import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../cart.service';
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
  cartCount: number = 0;
  logedIn: boolean = false;
  constructor(private router: Router,
     private cartService: CartService
  ) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
