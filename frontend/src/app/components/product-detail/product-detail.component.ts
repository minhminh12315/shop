import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../cart.service';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product: Product | undefined;
  categoryId: number | undefined;
  category: Category | undefined;
  similarProducts: Product[] = [];
  products: Product[] = [];
  loading = false;
  loadingSimilar = false;
  selectedImageIndex = 0;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  addToCart(): void {
    console.log('Thêm sản phẩm vào giỏ hàng:', this.product);
    if (this.product) {
      this.cartService.addToCart({
        id: this.product.id
      }, this.quantity);
      console.log('Thêm sản phẩm vào giỏ hàng:', this.product.id);
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.productService.getProductById(+id).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;

          // Lấy các sản phẩm cùng category (trừ sản phẩm hiện tại)
          if (this.product?.category) {
            this.productService
              .getProductsByCategory(this.product.category)
              .subscribe((products) => {
                this.similarProducts = products.filter(
                  (p) => p.id !== this.product?.id
                );
                this.loadingSimilar = false;

                console.log('Sản phẩm tương tự:', this.similarProducts);
              });
          }
        },
        error: () => {
          this.loadingSimilar = false;
        },
      });
    }
  }
}
