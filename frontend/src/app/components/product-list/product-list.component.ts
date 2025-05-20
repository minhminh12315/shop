import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this import
import { ProductService, Product } from '../../services/product.service';
import { RouterModule } from '@angular/router'; // Thêm dòng này


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, RouterModule], // Add this line
  standalone: true, // If not already present
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Danh sách sản phẩm:', data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách:', err);
        this.loading = false;
      },
    });
  }
}