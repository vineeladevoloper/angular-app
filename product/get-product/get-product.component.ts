import { Component } from '@angular/core';
import { Product } from '../product';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet,RouterLink} from '@angular/router';
import { User } from '../../src/app/Pages/user';
import { cart } from '../../src/app/Pages/cart';
@Component({
  selector: 'app-get-product',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,RouterLink,RouterOutlet],
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.css'
})
export class GetProductComponent {
  products:Product[]=[];
  product:Product;
  searchTerm?:string='';
  searchName?:string='';
  user:User;
  userRole?:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private router:Router){
    if(localStorage.getItem('role')==null){
      this.router.navigateByUrl('');
    }
    this.product=new Product();
    this.user=new User();
    this.getAllProducts();
    this.userRole=localStorage.getItem('role');
  }

  onSearch(): void {
    // console.log(this.searchTerm);
    if(this.searchTerm==''){
      this.getAllProducts();
    }
    else{
      this.http
      .get<Product[]>('http://localhost:5187/api/Product'+this.searchTerm,this.httpOptions)
      .subscribe((response)=>{
        this.products=response;
        // console.log(this.posts);
      })
    }
  }

  onSearchbyName(): void{
    // console.log(this.searchName);
    if(this.searchName==''){
      this.getAllProducts();
    }
    else{
      this.http
      .get<Product[]>('http://localhost:5187/api/Product/search'+this.searchName,this.httpOptions)
      .subscribe((response)=>{
        this.products=response;
        //console.log(this.posts);
      })
    }
  }


  getAllProducts(){
    this.http
    .get<Product[]>('http://localhost:5187/api/Product',this.httpOptions)
    .subscribe((response)=>{
      this.products=response;
      console.log(this.products);
    })
  }
  public createImgPath = (url: any) => { 
        return `http://localhost:5187/${url}`;
      }

  viewProduct(Id:any){;
    console.log(Id);
    if(this.userRole=='User')
      this.router.navigateByUrl('userdashbord/view-product/'+Id);
    else
      this.router.navigateByUrl('admin-dashbord/view-product/'+Id);
  }
  
  viewprofile(userId:any){
    console.log(userId);
    if(this.userRole=='User'){
      console.log(userId);
      this.router.navigateByUrl('userdashbord/profile/'+userId);
    }
    else{
      this.router.navigateByUrl('admin-dashbord/profile/'+userId);

    }
  }
  
}

