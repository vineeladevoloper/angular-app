import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterOutlet } from '@angular/router';
import { User } from '../../../Pages/user';
import { Login } from '../../../Pages/Login';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-userdashbord',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,HttpClientModule],
  templateUrl: './userdashbord.component.html',
  styleUrl: './userdashbord.component.css'
})
export class UserdashbordComponent {
  user:User;
  userId:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private router:Router){
    if(localStorage.getItem('role')!='User'){
      this.router.navigateByUrl('');
    }
      this.user=new User();
      this.userId=localStorage.getItem('userId');
      // console.log(this.userId);
      this.http.get('http://localhost:5187/api/User/GetUserById/'+this.userId,this.httpOptions)
      .subscribe((response)=>{
        this.user=response;
        // console.log(this.user);
      })
  }
  logout(){
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('login');
  }
}


