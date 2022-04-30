import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSetorComponent } from './table-setor.component';

describe('TableSetorComponent', () => {
  let component: TableSetorComponent;
  let fixture: ComponentFixture<TableSetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSetorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
