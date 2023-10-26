import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any = JSON.parse(localStorage.getItem('cartItems') || '{}');
  totalPrice = 0;
  open = false;
  constructor() {}

  getCartItems(): any {
    return this.cartItems;
  }

  addProduct(product: any) {
    if (this.cartItems[product._id]) {
      this.cartItems[product._id].quantity += 1;
      this.cartItems[product._id].price =
        this.cartItems[product._id].quantity *
        this.cartItems[product._id].product.price;
    } else {
      const item = {
        price: product.price,
        product: product,
        quantity: 1,
      };
      this.cartItems[product._id] = item;
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeProduct(productId: any) {
    const oldCartItems = this.cartItems;

    delete oldCartItems[productId];
    this.cartItems = oldCartItems;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  decQuantity(productId: any) {
    if (this.cartItems[productId] && this.cartItems[productId].quantity > 1) {
      this.cartItems[productId].quantity -= 1;
      this.cartItems[productId].price =
        this.cartItems[productId].quantity *
        this.cartItems[productId].product.price;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (let item in this.cartItems) {
      this.totalPrice += this.cartItems[item].price;
    }

    return this.totalPrice;
  }

  openCart() {
    this.open = true;
  }

  closeCart() {
    this.open = false;
  }

  deleteCart() {
    this.cartItems = {};
    localStorage.removeItem('cartItems');
  }
}
