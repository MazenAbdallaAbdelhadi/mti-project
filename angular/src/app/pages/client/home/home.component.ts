import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiHelperService } from 'src/app/services/api-helper.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoading: boolean = true;
  products: any = [];
  numberOfPages = 0;
  currentPage = 0;
  numberOfDocuments: any = 0;
  prevPage: any = 0;
  nextPage: any = 0;

  constructor(private api: ApiHelperService, private cartService: CartService) {
    this.api.getAll('products').subscribe({
      next: (res) => this.next(res),
      error: (err) => {
        console.log(err);
      },
    });
  }

  next(res: any): void {
    this.products = res.data.data;
    this.numberOfPages = res.data.paginationResult.numberOfPages;
    this.currentPage = res.data.paginationResult.currentPage;
    this.numberOfDocuments = res.data.numberOfDocuments;
    this.prevPage = this.currentPage - 1 == -1 ? null : this.currentPage - 1;
    this.nextPage =
      this.currentPage + 1 == this.numberOfPages + 1
        ? null
        : this.currentPage + 1;
    console.log(res);
    this.isLoading = false;
  }

  getNextPage() {
    if (this.nextPage) {
      const params = new HttpParams().set('page', this.nextPage);

      this.isLoading = true;
      this.api.getAll('users', params).subscribe({
        next: (res) => this.next(res),
        error: (err) => console.log(err),
      });
    }
  }

  getPrevPage() {
    if (this.prevPage) {
      const params = new HttpParams().set('page', this.nextPage);

      this.isLoading = true;
      this.api.getAll('users', params).subscribe({
        next: (res) => this.next(res),
        error: (err) => console.log(err),
      });
    }
  }

  addToCart(product: any) {
    this.cartService.addProduct(product);
  }
}
