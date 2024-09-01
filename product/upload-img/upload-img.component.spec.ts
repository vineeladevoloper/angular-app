import { ComponentFixture, TestBed } from '@angular/core/testing';

import { uploadimgComponent } from './upload-img.component';

describe('UploadImgComponent', () => {
  let component: uploadimgComponent;
  let fixture: ComponentFixture<uploadimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [uploadimgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(uploadimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
