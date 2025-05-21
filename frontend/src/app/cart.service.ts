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

  addToCart(product: any, quantity?: number): void {
    const cart = this.getCart();
    const existingItem = cart.find((item: any) => item.id === product.id);
    const qty = quantity && quantity > 0 ? quantity : 1;
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartCountSubject.next(this.getCartCount());
  }

  getCartCount(): number {
    return this.getCart().length;
  }

  increaseQuantity(productId: number): void {
    const cart = this.getCart();
    const item = cart.find((item: any) => item.id === productId);
    if (item) {
      item.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartCountSubject.next(this.getCartCount());
    }
  }

  decreaseQuantity(productId: number): void {
    const cart = this.getCart();
    const item = cart.find((item: any) => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartCountSubject.next(this.getCartCount());
    }
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart();
    const updatedCart = cart.filter((item: any) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartCountSubject.next(this.getCartCount());
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartCountSubject.next(0);
  }
}
