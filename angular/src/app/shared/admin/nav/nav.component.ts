import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthApiService } from 'src/app/services/auth-api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isAdminRoute = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthApiService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = event.url.startsWith('/admin');
      }
    });
  }

  get user() {
    if (localStorage.getItem('user'))
      return JSON.parse(localStorage.getItem('user') || 'null');

    return null;
  }

  openCart() {
    this.cartService.openCart();
  }

  handleLogout() {
    this.auth.logout().subscribe((res) => {
      console.log('logged out');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
  }
}
