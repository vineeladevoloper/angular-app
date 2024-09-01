import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCartByIdComponent } from './get-cart-by-id.component';

describe('GetCartByIdComponent', () => {
  let component: GetCartByIdComponent;
  let fixture: ComponentFixture<GetCartByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCartByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetCartByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
