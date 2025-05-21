import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../cart.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart-product',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class CartProductComponent implements OnInit {
  title: string = 'Giỏ hàng của bạn';
  description: string = 'Danh sách sản phẩm trong giỏ hàng của bạn';
  cart: any[] = [];
  products: any[] = [];
  categories: any[] = [];
  loading: boolean = false;
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService, // Thêm dòng này
    private categoryService: CategoryService // Thêm dòng này
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    // tách hàm for ra khỏi hàm ngOnInit
    this.getProductsFromCart();
  }

  // Lấy danh sách sản phẩm từ giỏ hàng
  // và gọi API để lấy thông tin sản phẩm
  getProductsFromCart(): void {
    for (let i = 0; i < this.cart.length; i++) {
      this.getProductDetails(this.cart[i].id);
    }
  }



  // trong cart của tôi chỉ chứa productId, tôi cần gọi api để lấy thông tin sản phẩm
  getProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe((product) => {
      this.products.push(product); 
      this.calculateTotal();
    });
  }

  getQuantity(productId: number): number {
    const item = this.cart.find((item) => item.id === productId);
    return item ? item.quantity : 1;
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();

    this.products = this.products.filter((product) => product.id !== productId);
    this.calculateTotal();
  }

  calculateTotal(): number {
    this.totalPrice = 0;
    for (let i = 0; i < this.cart.length; i++) {
      const product = this.products.find((p) => p.id === this.cart[i].id);
      if (product) {
        this.totalPrice += product.price * this.cart[i].quantity;
      }
    }
    return this.totalPrice;
  }
}
