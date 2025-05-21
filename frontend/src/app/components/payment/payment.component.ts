import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../services/order.service';
import { OrderDetailService } from '../../services/order-detail.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  title: string = 'Thanh toán';
  description: string = 'Thông tin thanh toán của bạn';
  cart: any[] = [];
  products: any[] = [];
  loading: boolean = false;
  totalPrice: number = 0;

  shippingAddress: string = '';
  paymentMethod: string = 'Credit Card';
  orderNotes: string = '';
  phoneNumber: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private http: HttpClient,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    // tách hàm for ra khỏi hàm ngOnInit
    this.getProductsFromCart();
  }

  checkout(): void {
    console.log('Đang xử lý thanh toán...');
    this.http
      .get('http://127.0.0.1:8000/api/user-info/', { withCredentials: true })
      .subscribe({
        next: (user) => {
          console.log('User info:', user);
        },
        error: () => {
          console.error('Lỗi khi lấy thông tin người dùng');
        },
      });

    // Gửi thông tin thanh toán đến API
    const orderData = {
      address: this.shippingAddress,
      payment_method: this.paymentMethod,
      phone_number: this.phoneNumber,
      total_amount: this.totalPrice,
      user: 1,
    };

    this.orderService.addOrder(orderData).subscribe({
      next: (response) => {
        console.log('Đặt hàng thành công:', response);
        const orderId = response.id; // Lấy id order từ response

        // Gửi thông tin chi tiết đơn hàng đến API
        const orderDetails = this.cart.map((item) => ({
          order: orderId, // Dùng id vừa lấy được
          product: item.id,
          quantity: item.quantity,
        }));

        // Gửi từng order detail (hoặc dùng forkJoin nếu muốn gửi song song)
        orderDetails.forEach((detail) => {
          this.orderDetailService.addOrderDetail(detail).subscribe({
            next: (res) => {
              console.log('Order detail added:', res);
              // Cập nhật giỏ hàng sau khi thêm chi tiết đơn hàng
            },
            error: (err) => {
              console.error('Lỗi khi thêm order detail:', err);
            },
          });
        });
        this.cartService.clearCart();

        this.router.navigate(['/']);

      },
      error: (error) => {
        console.error('Lỗi khi đặt hàng:', error);
      },
    });
  }

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
