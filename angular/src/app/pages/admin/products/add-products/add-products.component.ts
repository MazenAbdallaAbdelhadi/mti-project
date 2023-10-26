import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiHelperService } from 'src/app/services/api-helper.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent {
  categories: any = [];
  constructor(
    private api: ApiHelperService,
    private router: Router,
    private toast: ToastrService
  ) {
    const params = new HttpParams().set('limit', 'name,_id');
    api.getAll('categories', params).subscribe((res) => {
      this.categories = res.data.data;
      console.log(this.categories);
    });
  }

  imageSrc: any = '';

  form = new FormGroup({
    title: new FormControl<any>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    description: new FormControl<any>('', [
      Validators.required,
      Validators.min(20),
    ]),
    quantity: new FormControl<any>(null, [Validators.required]),
    price: new FormControl<any>(null, [Validators.required, Validators.min(0)]),
    category: new FormControl<any>('', [Validators.required]),
    image: new FormControl<any>(null, [Validators.required]),
  });

  onImagePicked(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({ image: file });
    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = reader.result);

    reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log(this.form);

    if (this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.form.value.title);
      formData.append('description', this.form.value.description);
      formData.append('quantity', this.form.value.quantity);
      formData.append('price', this.form.value.price);
      formData.append('category', this.form.value.category);
      formData.append('imageCover', this.form.value.image);

      this.api.createOne('products', formData).subscribe({
        next: (res) => {
          console.log(res);
          this.toast.success(res.message);
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
