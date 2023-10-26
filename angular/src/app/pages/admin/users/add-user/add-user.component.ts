import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiHelperService } from 'src/app/services/api-helper.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  constructor(
    private api: ApiHelperService,
    private router: Router,
    private toast: ToastrService
  ) {}

  imageSrc: any = '';

  form = new FormGroup({
    name: new FormControl<any>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
    ]),
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    password: new FormControl<any>('', [
      Validators.required,
      Validators.min(8),
    ]),
    role: new FormControl<any>(''),
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
      formData.append('email', this.form.value.email);
      formData.append('password', this.form.value.password);
      formData.append('profileImg', this.form.value.image);
      if (this.form.value.role) formData.append('role', this.form.value.role);

      this.api.createOne('users', formData).subscribe({
        next: (res) => {
          console.log(res);
          this.toast.success(res.message);
          this.router.navigate(['/admin/users']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
