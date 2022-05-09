import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSetorComponent } from './dialog-setor.component';

describe('DialogSetorComponent', () => {
  let component: DialogSetorComponent;
  let fixture: ComponentFixture<DialogSetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSetorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
