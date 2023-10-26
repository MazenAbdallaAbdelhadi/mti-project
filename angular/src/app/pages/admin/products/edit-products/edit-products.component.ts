import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiHelperService } from 'src/app/services/api-helper.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
})
export class EditProductsComponent {
  id: any = null;
  categories: any = [];
  product: any = {
    category: '',
    title: '',
    description: '',
    quantity: '',
    price: '',
  };
  imageSrc: any = '';

  constructor(
    private api: ApiHelperService,
    private router: Router,
    private toast: ToastrService,
    active: ActivatedRoute
  ) {
    const params = new HttpParams().set('limit', 'name,_id');
    api.getAll('categories', params).subscribe((res) => {
      this.categories = res.data.data;
      console.log(this.categories);
    });

    active.paramMap.subscribe((p) => {
      this.id = p.get('id');
      api.getById('products', this.id).subscribe({
        next: (res) => {
          console.log(res);
          this.product.category = res.data.category._id;
          this.product.title = res.data.title;
          this.product.description = res.data.description;
          this.product.quantity = res.data.quantity;
          this.product.price = res.data.price;

          this.imageSrc = res.data.imageCover;
          console.log(this.product);
        },
      });
    });
  }

  form = new FormGroup({
    title: new FormControl<any>(''),
    description: new FormControl<any>(''),
    quantity: new FormControl<any>(null),
    price: new FormControl<any>(null),
    category: new FormControl<any>(''),
    image: new FormControl<any>(null),
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
      if (this.form.value.title)
        formData.append('title', this.form.value.title);
      if (this.form.value.description)
        formData.append('description', this.form.value.description);
      if (this.form.value.quantity)
        formData.append('quantity', this.form.value.quantity);
      if (this.form.value.price)
        formData.append('price', this.form.value.price);
      if (this.form.value.category)
        formData.append('category', this.form.value.category);
      if (this.form.value.image)
        formData.append('imageCover', this.form.value.image);

      this.api.updateById('products', this.id, formData).subscribe({
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
