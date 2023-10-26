import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css'],
})
export class CartDrawerComponent {
  items: any = [];
  constructor(public cart: CartService) {
    for (let item in cart.cartItems) {
      this.items.push(cart.cartItems[item]);
    }
  }
}
