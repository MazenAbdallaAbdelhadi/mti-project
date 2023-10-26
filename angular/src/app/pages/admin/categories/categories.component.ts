import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiHelperService } from 'src/app/services/api-helper.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  isLoading: boolean = true;
  isDropdownOpen: boolean[] = [];
  categories: any = [];
  numberOfPages = 0;
  currentPage = 0;
  numberOfDocuments: any = 0;
  prevPage: any = 0;
  nextPage: any = 0;

  constructor(private api: ApiHelperService) {
    this.api.getAll('categories').subscribe({
      next: (res) => this.next(res),
      error: (err) => {
        console.log(err);
      },
    });
  }

  next(res: any): void {
    this.categories = res.data.data;
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

  deleteCategory(id: any) {
    console.log('click');

    this.api.deleteById('categories', id).subscribe({
      next: (res) => {
        console.log(res);
        const index = this.categories.findIndex(
          (c: { _id: any }) => c._id == id
        );
        this.categories.splice(index, 1);
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
      this.api.getAll('categories', params).subscribe({
        next: (res) => this.next(res),
        error: (err) => console.log(err),
      });
    }
  }

  getPrevPage() {
    if (this.prevPage) {
      const params = new HttpParams().set('page', this.nextPage);

      this.isLoading = true;
      this.api.getAll('categories', params).subscribe({
        next: (res) => this.next(res),
        error: (err) => console.log(err),
      });
    }
  }
}
