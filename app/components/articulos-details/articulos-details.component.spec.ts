import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosDetailsComponent } from './articulos-details.component';

describe('ArticulosDetailsComponent', () => {
  let component: ArticulosDetailsComponent;
  let fixture: ComponentFixture<ArticulosDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticulosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
