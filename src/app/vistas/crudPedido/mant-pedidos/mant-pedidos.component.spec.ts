import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPedidosComponent } from './mant-pedidos.component';

describe('MantPedidosComponent', () => {
  let component: MantPedidosComponent;
  let fixture: ComponentFixture<MantPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
