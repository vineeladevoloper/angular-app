import { Component } from '@angular/core';
import { Order } from '../../../src/app/Pages/Order';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
@Component({
  selector: 'app-get-all-order',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './get-all-order.component.html',
  styleUrl: './get-all-order.component.css'
})
export class GetAllOrderComponent {
  order: Order[] = [];
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: 'Bearer '+ localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient, private router: Router) {
    this.getorders();
  }
  getorders() {
    this.http
      .get<Order[]>('http://localhost:5254/api/Order/GetOrders',this.httpOptions)
      .subscribe((response) => {
        this.order = response;
        console.log(this.order);
      });
  }
  getId(id: any) {
    this.router.navigateByUrl('get-all-order' + id);
  }

}
