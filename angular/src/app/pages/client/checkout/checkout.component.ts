import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from 'src/app/services/api-helper.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  items: any = [];
  constructor(
    public cart: CartService,
    private api: ApiHelperService,
    private router: Router
  ) {
    for (let item in cart.cartItems) {
      this.items.push(cart.cartItems[item]);
    }
  }

  shippingAddressForm = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.shippingAddressForm);
    if (this.shippingAddressForm.valid) {
      const body: any = {};
      body['shippingAddress'] = this.shippingAddressForm.value;
      body['cartItems'] = this.cart.cartItems;
      console.log(body);
      this.api.createOne('orders', body).subscribe((res) => {
        this.cart.deleteCart();
        this.router.navigate(['/']);
        console.log(res);
      });
      console.log('valid');
    }
  }
}
