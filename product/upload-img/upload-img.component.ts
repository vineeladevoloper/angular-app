import {
  HttpClientModule,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Component,EventEmitter,OnInit,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './upload-img.component.html',
  styleUrl: './upload-img.component.css',
})
export class uploadimgComponent {
  progress?: number;
  message?: string;
  products: Product;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient) {
    this.products = new Product();
  }
  ngOnInit() {
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
      this.http.post('http://localhost:5187/api/Upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total!=undefined)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
   };
  
}