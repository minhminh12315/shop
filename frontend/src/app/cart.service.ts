import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartCountSubject: BehaviorSubject<number>;
  cartCount$;

  constructor() {
    const count = this.getCartCount();
    this.cartCountSubject = new BehaviorSubject<number>(count);
    this.cartCount$ = this.cartCountSubject.asObservable();
  }

  getCart(): any[] {
    if (typeof window !== 'undefined' && !localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    return typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : [];
  }

  addToCart(product: any): void {
    const cart = this.getCart();
    const existingItem = cart.find((item: any) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartCountSubject.next(this.getCartCount());
  }

  getCartCount(): number {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  }
}
