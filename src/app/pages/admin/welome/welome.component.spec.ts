import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelomeComponent } from './welome.component';

describe('WelomeComponent', () => {
  let component: WelomeComponent;
  let fixture: ComponentFixture<WelomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
