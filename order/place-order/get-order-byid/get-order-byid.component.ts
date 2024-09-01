import { Component } from '@angular/core';
import { Order } from '../../../src/app/Pages/Order';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-get-order-byid',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './get-order-byid.component.html',
  styleUrl: './get-order-byid.component.css'
})
export class GetOrderBYidComponent {
  Id?: number = 0;
  order: Order;
  errMsg: string = '';
  isorderExist: boolean = false;
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: 'Bearer '+ localStorage.getItem('token'),
    }),
  };
  constructor(
    private http: HttpClient,
    private roter: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.order = new Order();
    
    this.activateRoute.params.subscribe((p) => (this.Id = p['mid']));
    console.log(this.Id);
    this.search();
  }
  search() {
    console.log(this.order);
    this.http
      .get<Order>(
        'http://localhost:1587/api/Order/GetOrderById/' + this.Id,this.httpOptions
      )
      .subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.order = response;
          this.isorderExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid order Id';
          this.isorderExist = false;
        }
      });

}
deleteOrd() {
    this.http
      .delete('http://localhost:5187/api/Order/' + this.Id,this.httpOptions)
      .subscribe((response) => {
        console.log(response);
      });
    this.roter.navigateByUrl('get-all-orders');
  }
}
