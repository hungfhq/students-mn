import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsMnComponent } from './students-mn.component';

describe('StudentsMnComponent', () => {
  let component: StudentsMnComponent;
  let fixture: ComponentFixture<StudentsMnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsMnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsMnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
