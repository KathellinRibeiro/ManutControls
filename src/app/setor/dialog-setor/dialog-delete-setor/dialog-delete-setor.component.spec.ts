import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteSetorComponent } from './dialog-delete-setor.component';

describe('DialogDeleteSetorComponent', () => {
  let component: DialogDeleteSetorComponent;
  let fixture: ComponentFixture<DialogDeleteSetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteSetorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
