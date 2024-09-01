import { Component } from '@angular/core';
import { Login } from '../../../Pages/Login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent {

  login:Login;
  user:any;
  errMsg: string = '';
  httpResponse: any;

  captchaCode: string="";
  userInput: string="";
  attemptCount=0;
  isLoginButtonDisabled: boolean = false;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private router:Router,private http:HttpClient){
    this.login=new Login();
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const captchaLength = 6; // Adjust the length of the captcha as needed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < captchaLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.captchaCode = result;
  }

  validateCaptcha(): boolean {
    return this.userInput === this.captchaCode;
  }


  onSubmit(): void {
    if (!this.isLoginButtonDisabled) {
      if (this.attemptCount < 3) {
        if (this.validateCaptcha()) {
          this.http.post('http://localhost:5187/api/User/Validate', this.login, this.httpOptions)
            .subscribe((response) => {
              this.httpResponse = response;
              console.log(this.httpResponse);
              if (this.httpResponse.token != null) {
                localStorage.setItem('token', this.httpResponse.token);
                localStorage.setItem('userId', this.httpResponse.userId);
                localStorage.setItem('role', this.httpResponse.role);
                if (this.httpResponse.role == 'Admin') {
                  this.router.navigateByUrl('admin-dashbord/getproduct');
                  console.log("admin");
                } else if (this.httpResponse.role == 'User') {
                  this.router.navigateByUrl('userdashbord/getproduct');
                  console.log("User");
                }
              } else {

                this.attemptCount++;
                let c=3-this.attemptCount;
                this.errMsg = `Invalid Credentials (Attempt ${c} of 3)`;
                if (this.attemptCount == 6) {
                  this.errMsg = 'Maximum login attempts reached. Please try again after 30 seconds.';
                  this.disableLoginButtonFor30Seconds();
                }
                console.log(this.errMsg);
              }
            });
        } else {
          this.errMsg = 'Invalid Captcha';
        }
      }
    }
  }
  
  disableLoginButtonFor30Seconds(): void {
    // Disable the login button
    this.isLoginButtonDisabled = true;
  
    // After 30 seconds, enable the login button
    setTimeout(() => {
      // Enable the login button
      this.isLoginButtonDisabled = false;
      this.errMsg="";
      this.onReset();
    }, 30000);
  }

  onReset(): void {
    this.generateCaptcha();
    this.login = new Login(); // Reset the login object
    this.userInput = ""; // Reset the userInput
    this.errMsg = '';
  }
  

  redirectToRegister() {
    this.router.navigateByUrl('register');
  }
}

