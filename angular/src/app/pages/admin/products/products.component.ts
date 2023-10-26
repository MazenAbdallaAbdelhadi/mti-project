import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiHelperService } from 'src/app/services/api-helper.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  isLoading: boolean = true;
  isDropdownOpen: boolean[] = [];
  products: any = [];
  numberOfPages = 0;
  currentPage = 0;
  numberOfDocuments: any = 0;
  prevPage: any = 0;
  nextPage: any = 0;

  constructor(private api: ApiHelperService) {
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

  deleteProduct(id: any) {
    console.log('click');

    this.api.deleteById('products', id).subscribe({
      next: (res) => {
        console.log(res);
        const index = this.products.findIndex((c: { _id: any }) => c._id == id);
        this.products.splice(index, 1);
      },
      error: (err) => console.log(err),
    });
  }

  toggleDropdown(index: number) {
    this.isDropdownOpen[index] = !this.isDropdownOpen[index];
    this.isDropdownOpen = this.isDropdownOpen.map((value, i) =>
      i == index ? this.isDropdownOpen[index] : false
    );
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
}
