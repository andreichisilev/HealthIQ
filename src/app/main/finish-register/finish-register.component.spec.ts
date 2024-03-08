import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishRegisterComponent } from './finish-register.component';

describe('FinishRegisterComponent', () => {
  let component: FinishRegisterComponent;
  let fixture: ComponentFixture<FinishRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
