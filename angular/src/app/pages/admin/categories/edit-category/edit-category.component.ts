import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from 'src/app/services/api-helper.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent {
  name = '';
  description = '';
  image = null;
  id: any = null;
  imageSrc: any = '';
  constructor(
    private api: ApiHelperService,
    private router: Router,
    private activated: ActivatedRoute
  ) {
    activated.paramMap.subscribe((res) => {
      this.id = res.get('id');
      api.getById('categories', res.get('id')).subscribe({
        next: (result) => {
          this.name = result.data.name;
          this.description = result.data.description;
          this.image = result.data.image;
          this.imageSrc = result.data.image;
        },
      });
    });
  }

  form = new FormGroup({
    name: new FormControl<any>(this.name),
    description: new FormControl<any>(this.description),
    image: new FormControl<any>(this.image),
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

      if (this.form.value.name) formData.append('name', this.form.value.name);
      if (this.form.value.description)
        formData.append('description', this.form.value.description);

      if (this.form.value.image)
        formData.append('image', this.form.value.image);

      console.log(this.id);

      this.api.updateById('categories', this.id, formData).subscribe({
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
