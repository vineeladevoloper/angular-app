import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCartitemsComponent } from './get-all-cartitems.component';

describe('GetAllCartitemsComponent', () => {
  let component: GetAllCartitemsComponent;
  let fixture: ComponentFixture<GetAllCartitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllCartitemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllCartitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
