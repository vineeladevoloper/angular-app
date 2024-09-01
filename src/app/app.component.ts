import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

    title = 'Ecom';
    constructor(private router:Router){
      
    }
    home(){
      this.router.navigateByUrl('home');
    }
    contact(){
      this.router.navigateByUrl('contact');
    }
    about(){
      this.router.navigateByUrl('about');
    }
  
}
