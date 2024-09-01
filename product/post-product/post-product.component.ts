import { Component } from '@angular/core';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { uploadimgComponent } from '../upload-img/upload-img.component';
import { HttpHeaders } from '@angular/common/http';
import { RouterOutlet, Router, ActivatedRoute} from '@angular/router';
@Component({

  selector: 'app-post-product',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,uploadimgComponent,RouterOutlet],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.css'
})
export class PostProductComponent {
  products:Product;
  create:boolean;
  response: any;
  msg?:string='';
  userId?:string;
  imgurl?:string='';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private router:Router,private activateRoute: ActivatedRoute){
    if(localStorage.getItem('role')!='Admin'){
      this.router.navigateByUrl('');
    }
    this.products=new Product;
    this.activateRoute.params.subscribe((p) => (this.userId = p['uid']));
    this.response={dbPath: ''};
    this.create=false;
  }
  uploadFinished = (event: any) => { 
    console.log("Upload triggered");
      this.response = event; 
      this.imgurl=this.response.dbPath;
      console.log(this.products);
    }
    onSubmit(): void {
      this.products.imageUrl = this.imgurl;
      console.log(this.products);
      this.http.post('http://localhost:5187/api/Product', this.products, this.httpOptions)
        .subscribe(response => {
          console.log('Post created successfully', response);
          this.msg = 'Post created successfully';
          this.router.navigateByUrl('admin-dashbord/getproduct');
        }, error => {
          console.error('Error creating post', error);
          this.msg = 'Error creating post';
        });
}
}
