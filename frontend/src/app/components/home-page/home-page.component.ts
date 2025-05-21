import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common'; // Add this import
import { RouterModule } from '@angular/router'; // Thêm dòng này
import { ImageService, Image } from '../../services/image.service';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [
    CommonModule,
    RouterModule, // Thêm dòng này
  ],
  standalone: true,
})
export class HomePageComponent {
  title: string = 'Welcome to Our Store';
  description: string = 'Find the best products here!';
  products: Product[] = [];
  images: Image[] = [];
  categories: Category[] = [];
  loading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchImages();
    this.fetchCategories();
  }

  fetchProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách:', err);
        this.loading = false;
      },
    });
  }

  fetchImages(): void {
    this.loading = true;
    this.imageService.getImages().subscribe({
      next: (data) => {
        this.images = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách hình ảnh:', err);
        this.loading = false;
      },
    });
  }

  fetchCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách danh mục:', err);
        this.loading = false;
      },
    });
  }
}
