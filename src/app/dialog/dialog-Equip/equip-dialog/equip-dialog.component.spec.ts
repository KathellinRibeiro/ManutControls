import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipDialogComponent } from './equip-dialog.component';

describe('EquipDialogComponent', () => {
  let component: EquipDialogComponent;
  let fixture: ComponentFixture<EquipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
