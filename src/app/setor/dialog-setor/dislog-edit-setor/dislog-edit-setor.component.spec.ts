import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DislogEditSetorComponent } from './dislog-edit-setor.component';

describe('DislogEditSetorComponent', () => {
  let component: DislogEditSetorComponent;
  let fixture: ComponentFixture<DislogEditSetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DislogEditSetorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DislogEditSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
