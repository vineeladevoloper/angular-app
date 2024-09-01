import { Component } from '@angular/core';
import { User } from '../../Pages/user';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders,HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:User;
  userId:string="";
  role?:any;
  errMsg: string = '';
  isUserExist: boolean = false;
  following:boolean=false;
  loggedinUserId?:any;
  textInput: string = '';
  isEmpty: boolean = false;
  reportbool:boolean=false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private activateRoute:ActivatedRoute,private http:HttpClient,private router:Router){
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
        // console.log(response);
        if (response != null) {
          this.user = response;
           console.log(this.user);
          this.isUserExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid User Id';
          this.isUserExist = false;
        }
      });
  }
}
