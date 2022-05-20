import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutDialogComponent } from './manut-dialog.component';

describe('ManutDialogComponent', () => {
  let component: ManutDialogComponent;
  let fixture: ComponentFixture<ManutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
