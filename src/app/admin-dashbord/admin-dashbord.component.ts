import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink,RouterOutlet } from '@angular/router';
import { User } from '../Pages/user';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashbord',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HttpClientModule,RouterLink],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {
  admin:User;
  adminId:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute){
    if(localStorage.getItem('role')!='Admin'){
         this.router.navigateByUrl('');
    }
      this.admin=new User();
      this.adminId=localStorage.getItem('userId');
      // console.log(this.adminId);
      this.http.get('http://localhost:5187/api/User/GetUserById/'+this.adminId,this.httpOptions)
      .subscribe((response)=>{
        this.admin=response;
        console.log(this.admin);
      })
  }


  logout(){
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('login');
  }
}

