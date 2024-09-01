import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOrderBYidComponent } from './get-order-byid.component';

describe('GetOrderBYidComponent', () => {
  let component: GetOrderBYidComponent;
  let fixture: ComponentFixture<GetOrderBYidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetOrderBYidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetOrderBYidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
