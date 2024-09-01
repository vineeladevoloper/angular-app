import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient ,HttpClientModule,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../Pages/user';
import { Observable } from 'rxjs';
//import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    user:User;

    errMsg:string='';
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    constructor(private router:Router,private http:HttpClient){
      this.user=new User();

    }
    
     onSubmit(): void {
      console.log(this.user)
      console.log()
      console.log(this.user.role)
      this.http.post<User>('http://localhost:5187/api/User/Register',this.user)
      .subscribe(
        (response:any)=>{
        console.log(response);
        this.router.navigateByUrl('');
       // this.sendEmail();
      },
      (error: any) => {
        // Handle error here
        console.error('Error:', error.error);
        this.errMsg=error.error;
      }
      );
    }
    onReset(form: NgForm): void {
      this.errMsg='';
      form.reset();
    }
    redirectToLogin() {
      this.router.navigateByUrl('');
    }
  
    
}
