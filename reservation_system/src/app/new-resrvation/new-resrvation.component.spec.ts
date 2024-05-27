import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResrvationComponent } from './new-resrvation.component';

describe('NewResrvationComponent', () => {
  let component: NewResrvationComponent;
  let fixture: ComponentFixture<NewResrvationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewResrvationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewResrvationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
