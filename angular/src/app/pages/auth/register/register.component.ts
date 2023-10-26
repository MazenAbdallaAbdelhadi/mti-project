import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthApiService } from 'src/app/services/auth-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private auth: AuthApiService,
    private router: Router,
    private toast: ToastrService
  ) {}

  register = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.register.valid) {
      const { name, email, password, confirmPassword } = this.register.value;
      this.auth.register({ name, email, password, confirmPassword }).subscribe({
        next: (res) => {
          this.toast.success(res.message);
          this.router.navigate(['/']);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        },
        error: (err) => {
          this.toast.error(err.error.message);
          console.log(err.error);
        },
      });
    }
  }
}
