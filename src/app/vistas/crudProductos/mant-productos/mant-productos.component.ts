import { ProductService } from './../../../servicios/product.service';
import { ProductI } from './../../../modelos/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from './../../../modelos/category.interface';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/servicios/category.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mant-productos',
  templateUrl: './mant-productos.component.html',
  styleUrls: ['./mant-productos.component.css']
})
export class MantProductosComponent implements OnInit {


  editing: boolean = false;

  constructor(private categoryService:CategoryService,
    private http:HttpClient,
    private router:Router,
    private _activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

    modeloProduct: ProductI| undefined;

    modProd:ProductI={
      _id:'',
      name:'',
      category:'h',
      type:'',
      price:0,
      quantity:0
    }

  formProducto = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
    category: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(10)]),
    type: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(5)]),
    price: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(5)]),
    quantity: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(5)]),
  })


  ngOnInit(): void {
    this.loadProduct();
    this.getCollectionCategory();
  }

  collectionCategory = [{'name': this.getCollectionCategory}];
  collectionTypes = [{'types': this.getCollectionCategory}];

  loadProduct() {
    let id_entrada = this._activatedRoute.snapshot.params['id'];
    if (id_entrada) {
      this.editing = true;
      environment.editing = true;
      this.productService.getProductById(id_entrada).subscribe(
        data => {
          this.modProd = data;
          this.formProducto.setValue({
            '_id': this.modProd._id,
            'name': this.modProd.name,
            'category': this.modProd.category,
            'type': this.modProd.type,
            'price': this.modProd.price,
            'quantity': this.modProd.quantity,
          });
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          })
        })
    } else {
      this.editing = false;
      environment.editing = false;
    }
  }

getCollectionCategory(){
  let direccion = environment.URL + "category/";
  this.http.get<any>(direccion,{
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'x-access-token': '' + localStorage.getItem("Token")
    })
  }).subscribe((res: any) => {
    this.collectionCategory = res;
  }, error => {
    console.log({ error });
  })
}

aggProducto() {
  if (this.editing) {
    const Prod: ProductI = {
      _id: this.formProducto.value._id,
      name: this.formProducto.value.name,
      category: this.formProducto.value.category,
      type: this.formProducto.value.type,
      price: this.formProducto.value.price,
      quantity: this.formProducto.value.quantity
    }
    this.productService.updateProduct(Prod, Prod._id).subscribe(data => {
      environment.editing = false;
      this.editing = false;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto Actualizado con Exito',
        showConfirmButton: false,
        timer: 800
      })
      this.router.navigate(['TableProduct']);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'No se han podido actualizar los campos',
        text: error.error.message,
      })
    });

  } else {
    environment.editing = false;
      this.editing = false;
    const Prod: ProductI = {
      _id: '',
      name: this.formProducto.value.name,
      category: this.formProducto.value.category,
      type: this.formProducto.value.type,
      price: this.formProducto.value.price,
      quantity: 0

    }
    this.productService.createProduct(Prod).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto Creado con Exito',
        showConfirmButton: false,
        timer: 800
      })
      this.router.navigate(['TableProduct']);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido ingresar el producto',
        text: error.error.message,
      })
    });
  }
}

deleteProduct(_id:string){

}

exit(){
    environment.editing = false;
    this.editing = false;
    this.router.navigate(['TableProduct'])
}
}
