import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from 'src/app/services/api-helper.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  constructor(private api: ApiHelperService, private router: Router) {}

  imageSrc: any = '';

  form = new FormGroup({
    name: new FormControl<any>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
    ]),
    description: new FormControl<any>('', [
      Validators.required,
      Validators.minLength(20),
    ]),
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
      formData.append('name', this.form.value.name);
      formData.append('description', this.form.value.description);
      formData.append('image', this.form.value.image);

      this.api.createOne('categories', formData).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
