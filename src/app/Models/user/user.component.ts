import { Component } from '@angular/core';
import { User } from '../../Pages/user';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
user : User;
userId?: any;
constructor(){
  this.user = new User();
  console.log(User);
  
}

}

