import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiHelperService } from 'src/app/services/api-helper.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  user = {
    name: '',
    email: '',
    role: '',
    active: '',
  };
  id: any = null;
  form = new FormGroup({
    name: new FormControl<any>(''),
    email: new FormControl<any>(''),
    password: new FormControl<any>(''),
    role: new FormControl<any>(''),
    active: new FormControl<any>(null),
    image: new FormControl<any>(null),
  });

  constructor(
    private api: ApiHelperService,
    private router: Router,
    private active: ActivatedRoute,
    private toast: ToastrService
  ) {
    active.paramMap.subscribe((p) => {
      this.id = p.get('id');
      api.getById('users', this.id).subscribe((res) => {
        this.user.name = res.data.name;
        this.user.email = res.data.email;
        this.user.role = res.data.role;
        this.user.active = res.data.active;
        this.imageSrc = res.data.profileImg;
        console.log(res);
      });
    });
  }

  imageSrc: any = '';

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
      if (this.form.value.email)
        formData.append('email', this.form.value.email);
      if (this.form.value.password)
        formData.append('password', this.form.value.password);
      if (this.form.value.image)
        formData.append('profileImg', this.form.value.image);
      if (this.form.value.role) formData.append('role', this.form.value.role);

      if (this.form.value.active)
        formData.append('active', this.form.value.active);

      this.api.updateById('users', this.id, formData).subscribe({
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
