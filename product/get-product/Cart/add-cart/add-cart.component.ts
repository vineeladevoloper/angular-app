import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { uploadimgComponent } from '../../../upload-img/upload-img.component';
import { HttpHeaders } from '@angular/common/http';
import { cart } from '../../../../src/app/Pages/cart';
@Component({
  selector: 'app-add-cart',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,uploadimgComponent],
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.css'
})
export class AddCartComponent {
  cartItem:cart;
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: 'Bearer '+ localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private router: Router){
    this.cartItem= new cart();
  }

  addToCart(productId:any,quantity:any){
    this.cartItem.quantity=quantity;
    this.cartItem.ProductId=productId;
    //this.cartItem.image=image;
    this.cartItem.userId=localStorage.getItem('userId');
    this.http
    .post('http://localhost:5187/api/Cart/AddToCart/',this.cartItem,this.httpOptions)
    .subscribe((Response)=>{
      console.log(Response);
    });
    this.router.navigateByUrl('userbashbord/getallcart')
    location.reload();
    

  }

  }


