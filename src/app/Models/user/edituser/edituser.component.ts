import { Component } from '@angular/core';
import { User } from '../../../Pages/user';
import { CommonModule } from '@angular/common';
import { FormsModule,} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {

  user:User;
  userId?:string;
  role?:any;
  errMsg: string = '';
  isUserExist: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private router:Router,private activateRoute: ActivatedRoute,private http:HttpClient){
    if(localStorage.getItem('role')==null){
       this.router.navigateByUrl('');
    }
    this.user=new User();
    this.role=localStorage.getItem('role');
    this.activateRoute.params.subscribe((p) => (this.userId = p['uid']));
    console.log(this.userId);
    this.search();
  }
  search() {
    this.http
      .get<User>(
        'http://localhost:5187/api/User/GetUserById/' + this.userId,this.httpOptions
      )
      .subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.user = response;
          this.isUserExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid User Id';
          this.isUserExist = false;
        }
      });
  }
  edit() {
    this.http
      .put('http://localhost:5187/api/User/EditUser', this.user,this.httpOptions)
      .subscribe((response) => {
        console.log(response);
      });
    if(localStorage.getItem('role')=="User"){
      this.router.navigateByUrl('userdashbord');
    }
    else{
      this.router.navigateByUrl('admin-dashbord');
    }
  }  
  }



