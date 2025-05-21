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


    // check logedIn dang loi
    // this.http
    //   .get<{ id: number; username: string; email: string }>(
    //     'http://127.0.0.1:8000/api/user-info/',
    //     { withCredentials: true }
    //   )
    //   .subscribe({
    //     next: (user) => {
    //       console.log('User info:', user);
    //       const orderData = {
    //         address: this.shippingAddress,
    //         payment_method: this.paymentMethod,
    //         phone_number: this.phoneNumber,
    //         total_amount: this.totalPrice,
    //         user: user.id,
    //       };

    //       this.orderService.addOrder(orderData).subscribe({
    //         next: (response: any) => {
    //           console.log('Đặt hàng thành công:', response);
    //           const orderId = response.id;

    //           const orderDetails = this.cart.map((item) => ({
    //             order: orderId,
    //             product: item.id,
    //             quantity: item.quantity,
    //           }));

    //           orderDetails.forEach((detail) => {
    //             this.orderDetailService.addOrderDetail(detail).subscribe({
    //               next: (res: any) => {
    //                 console.log('Order detail added:', res);
    //               },
    //               error: (err: any) => {
    //                 console.error('Lỗi khi thêm order detail:', err);
    //               },
    //             });
    //           });

    //           this.cartService.clearCart();

    //           this.router.navigate(['/']);
    //         },
    //         error: (error: any) => {
    //           console.error('Lỗi khi đặt hàng:', error);
    //         },
    //       });
    //     },
    //     error: (err) => {
    //       console.error('Lỗi khi lấy thông tin người dùng', err);
    //       this.router.navigate(['/login']);
    //     },
    //   });

    const orderData = {
      address: this.shippingAddress,
      payment_method: this.paymentMethod,
      phone_number: this.phoneNumber,
      total_amount: this.totalPrice,
      user: 1,
    };

    this.orderService.addOrder(orderData).subscribe({
      next: (response: any) => {
        console.log('Đặt hàng thành công:', response);
        const orderId = response.id;

        const orderDetails = this.cart.map((item) => ({
          order: orderId,
          product: item.id,
          quantity: item.quantity,
        }));

        orderDetails.forEach((detail) => {
          this.orderDetailService.addOrderDetail(detail).subscribe({
            next: (res: any) => {
              console.log('Order detail added:', res);
            },
            error: (err: any) => {
              console.error('Lỗi khi thêm order detail:', err);
            },
          });
        });

        this.cartService.clearCart();

        this.router.navigate(['/']);
      },
      error: (error: any) => {
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
