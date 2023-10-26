import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthApiService } from 'src/app/services/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private auth: AuthApiService,
    private router: Router,
    private toast: ToastrService
  ) {}

  login = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });

  onSubmit() {
    if (this.login.valid) {
      const { email, password } = this.login.value;
      this.auth.login({ email, password }).subscribe({
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
