import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddarticulosComponent } from './add-articulo.component';

describe('AddarticulosComponent', () => {
  let component: AddarticulosComponent;
  let fixture: ComponentFixture<AddarticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddarticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddarticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
