import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartResponse, ProductResponse } from '../../../../src/app/Pages/CartResponse';
import { Product } from '../../../product';

@Component({
  selector: 'app-get-all-cartitems',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './get-all-cartitems.component.html',
  styleUrls: ['./get-all-cartitems.component.css']
})
export class GetAllCartitemsComponent {

  cartItems?: CartResponse;
  quantity: number = 0;
  total: number = 0;
  totalCartPrice: number = 0;
  carts1: ProductResponse[] = [];
  qty: number = 0;
  gtotal: number = 0;
  rowcount: number = 0;
  successMessage: string = '';  // Added property for success message

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient, private router: Router) {
    this.getAllCartItems();
  }

  selectQty(e: any) {
    this.quantity = e.target.value;
  }

  setTotal() {
    this.gtotal = this.cartItems?.price ?? 0;
    this.rowcount = this.cartItems?.productItems?.length ?? 0;
  }

  getAllCartItems() {
    let userId = localStorage.getItem('userId');
    this.http
      .get<CartResponse>('http://localhost:5187/api/Cart/GetCartItems?userId=' + userId, this.httpOptions)
      .subscribe((response) => {
        this.cartItems = response;
        console.log(this.cartItems);
        this.carts1 = []; // Reset the cart items before pushing new ones
        if (this.cartItems?.productItems) {
          for (let item of this.cartItems?.productItems) {
            if (item.products) {
              let cart = new ProductResponse();
              cart = item.products;
              cart.quantity = item.quantity;
              this.carts1.push(cart);
            }
          }
          if (this.cartItems?.price) {
            this.setTotal();
          }
        }
        console.log(this.carts1);
      });
  }

  deleteCartItem(id: any) {
    console.log(id);
    const userId = localStorage.getItem("userId");

    this.http
      .delete(`http://localhost:5187/api/Cart/RemoveFromCart?productId=${id}&userId=${userId}`, {
        ...this.httpOptions,
        responseType: 'text'
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.successMessage = 'Removed from cart successfully!';  // Set success message
          this.getAllCartItems(); // Refresh the cart items after deletion
        },
        (error) => {
          console.error('Error removing item from cart:', error);
        }
      );
  }

  public createImgPath = (url: any) => { 
    return `http://localhost:5187/${url}`;
  }

}
