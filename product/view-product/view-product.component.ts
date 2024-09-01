import { Component } from '@angular/core';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,  ActivatedRoute}from '@angular/router';
import { Product } from '../product';
import { User } from '../../src/app/Pages/user';
import { cart } from '../../src/app/Pages/cart';
import { Order } from '../../src/app/Pages/Order';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  Id?:number;
  product:Product;
  user:User;
  role?:any;
  cartItem:cart;
  quantity=1;
  order?:Order;
  orders: Order[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private activateRoute: ActivatedRoute,private router:Router){
    if(localStorage.getItem('role')==null){
      this.router.navigateByUrl('');
    }
    this.product=new Product();
    this.user = new User();
    this.cartItem = new cart();
    this.role=localStorage.getItem('role');
    this.activateRoute.params.subscribe((p) => (this.Id = p['pid']));
    this.getProduct();
      }

  getProduct(){
    this.http
    .get<Product>('http://localhost:5187/api/Product/'+this.Id,this.httpOptions)
    .subscribe((response)=>{
      this.product=response;
    })

  }

  public createImgPath = (url: any) => { 
    return `http://localhost:5187/${url}`;
  }
  
  deleteProduct(id:any) {
    console.log(id);
    this.http
      .delete('http://localhost:5187/api/Product/'+id,this.httpOptions)
      .subscribe((response) => {
        console.log(response);
        if(this.role == "User"){
          this.router.navigateByUrl('userdashbord/getproduct');
        }else{
          this.router.navigateByUrl('admin-dashbord/getproduct');
        }
      });
}
addToCart(productId:any){
  this.cartItem.quantity=this.quantity;
  this.cartItem.ProductId=productId;
  this.cartItem.userId=localStorage.getItem('userId');
  this.http
  .post(`http://localhost:5187/api/Cart/AddToCart?productId=${this.cartItem.ProductId}&userId=${this.cartItem.userId}&quantity=${this.cartItem.quantity}`,this.httpOptions)
  .subscribe((Response)=>{
    console.log(Response);
    this.router.navigateByUrl('userdashbord/get-all-cartitems');
  });
}
decrementQuantity(){
  if(this.quantity<=0){
    this.quantity = 1;
  } else{
    this.quantity-=1;
  }
}
incrementQuantity(){
  this.quantity+=1;
}


placeOrder(){
  //this.order.userId=localStorage.getItem('userId') 
  this.http
  .post('http://localhost:5187/api/Order?userId', this.order,this.httpOptions)
  .subscribe((Response) => {
    console.log(Response);
  });
  this.sendEmail1();
  this.sendEmail2();
this.router.navigateByUrl('userdashbord/get-orderbyid');
}

sendEmail1() {
  const templateParams = {
    to_name: this.user.userName,
    
    // message_html: New User Registered ${this.users.userName} with mail ${this.users.email},
    message: "Thank you For Ordering in Colours And Shades",
    to_mail: this.user.email
  };

  emailjs.init("4ge5mHJTEMHIUsZ3j");
  emailjs.send('service_70wdwbh', 'template_tlod5gj', templateParams)
    .then((response) => {
      console.log('Email sent successfully:', response);
    }, (error) => {
      console.error('Error sending email:', error);
    });
}

sendEmail2() {
  const templateParams = {
    
    
    // message_html: New User Registered ${this.users.userName} with mail ${this.users.email},
    message: "Customer ramjee have ordered an product"
  };

  emailjs.init("06TCQEhhC_lLpaQxC");
  emailjs.send('service_2818co8', 'template_ltn5oqr', templateParams)
    .then((response) => {
      console.log('Email sent successfully:', response);
    }, (error) => {
      console.error('Error sending email:', error);
    });
}
getorders() {
  this.http
    .get<Order[]>('http://localhost:5254/api/Order/GetOrders',this.httpOptions)
    .subscribe((response) => {
      this.orders = response;
      console.log(this.order);
    });
}

}




  


