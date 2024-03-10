import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrecipesComponent } from './userrecipes.component';

describe('UserrecipesComponent', () => {
  let component: UserrecipesComponent;
  let fixture: ComponentFixture<UserrecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserrecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserrecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
