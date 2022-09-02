import { ProductI } from './../../../modelos/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/servicios/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private productService: ProductService,
    private router: Router) { }

  products:ProductI[] | undefined;

  ngOnInit(): void {
    this.getProduct();
  }

  newProduct(){

  }

  editProduct(_id:String){
    this.router.navigate(['Producto',_id])
  }

  getProduct(){
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    },error=>{
        Swal.fire({
        icon: 'error',
        title: 'No se han podido obtener los clientes',
        text: error.error.message,
      })
    });

  }
}
