import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this import
import { ProductService, Product } from '../../services/product.service';
import { RouterModule, Router } from '@angular/router'; // Thêm dòng này
import { ImageService, Image } from '../../services/image.service';
import { Category, CategoryService } from '../../services/category.service';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, RouterModule], // Add this line
  standalone: true, // If not already present
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  images: Image[] = [];
  selectedCategory: number | null = null;
  selectedFilter: string = 'default';
  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private cartService: CartService,
    private router: Router // Thêm dòng này
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchImages();
    this.fetchCategories();
  }

  addToCart(productId: number): void {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      this.cartService.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.image,
      });
      console.log('Thêm sản phẩm vào giỏ hàng:', productId);
    }
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

  fetchImages(): void {
    this.loading = true;
    this.imageService.getImages().subscribe({
      next: (data) => {
        this.images = data;
        console.log('Danh sách hình ảnh:', data);
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
        console.log('Danh sách danh mục:', data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách danh mục:', err);
        this.loading = false;
      },
    });
  }

  chooseCate(categoryId: number): void {
    this.selectedCategory = categoryId;
    console.log('Danh mục đã chọn:', this.selectedCategory);

    // this.productService.getProductsByCategory(categoryId).subscribe({
    //   next: (data) => {
    //     this.products = data;
    //     console.log('Danh sách sản phẩm theo danh mục:', data);
    //   },
    //   error: (err) => {
    //     console.error('Lỗi khi lấy danh sách sản phẩm theo danh mục:', err);
    //   },
    // });
  }

  chooseFilter(filter: string): void {
    this.selectedFilter = filter;
    console.log('Lọc theo:', this.selectedFilter);

    // Thực hiện lọc sản phẩm theo filter
    // if (filter === 'asc') {
    //   this.products.sort((a, b) => a.price - b.price);
    // } else if (filter === 'desc') {
    //   this.products.sort((a, b) => b.price - a.price);
    // } else if (filter === 'default') {
    //   this.products.sort((a, b) => a.id - b.id);
    // }
  }

  applyFilter(): void {
  console.log('Áp dụng bộ lọc:', this.selectedFilter);

  if (this.selectedCategory) {
    this.productService
      .getProductsByCategory(this.selectedCategory)
      .subscribe({
        next: (data) => {
          this.products = this.sortProducts(data, this.selectedFilter);
          console.log('Danh sách sản phẩm theo danh mục:', this.products);
        },
        error: (err) => {
          console.error('Lỗi khi lấy danh sách sản phẩm theo danh mục:', err);
        },
      });
  } else if (this.selectedCategory === null) {
    // Nếu không có danh mục nào được chọn, lấy lại toàn bộ sản phẩm
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = this.sortProducts(data, this.selectedFilter);
        console.log('Danh sách sản phẩm:', this.products);
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', err);
      },
    });
  }
}

  sortProducts(products: Product[], filter: string): Product[] {
    if (filter === 'asc') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (filter === 'desc') {
      return [...products].sort((a, b) => b.price - a.price);
    } else if (filter === 'default') {
      return [...products].sort((a, b) => a.id - b.id);
    }
    return products;
  }

  clearFilter(): void {
    this.selectedCategory = null;
    this.selectedFilter = 'default';
    console.log('Đã xóa bộ lọc');
    console.log(this.selectedFilter);

  }


}
