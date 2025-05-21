import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product: Product | undefined;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  addToCart(): void {
    console.log('Thêm sản phẩm vào giỏ hàng:', this.product);
    if (this.product) {
      this.cartService.addToCart({
        id: this.product.id,
      });
      console.log('Thêm sản phẩm vào giỏ hàng:', this.product.id);
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.productService.getProductById(+id).subscribe({
        next: (data) => {
          console.log('Chi tiết sản phẩm:', data);
          this.product = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
