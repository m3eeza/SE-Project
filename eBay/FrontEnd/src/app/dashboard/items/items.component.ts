import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {
  public ProductsList = [];
  username ;
  settings = {
    columns: {
      _id: {
        title: 'Product ID'
      },
      name: {
        title: 'Product'
      },
      price: {
        title: 'price'
      },
      createdAt: {
        title: 'created at'
      },
      updatedAt: {
        title: 'updated at'
      },
     
    },
    add:{
      confirmCreate:true
     },
     edit:{
      confirmSave:true
     },
     delete :{
      confirmDelete: true
    }
  };
  constructor(private http: HttpClient) {

  }
  
  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).user.username;    

    this.http.get('http://localhost:3000/api/Product/getProductsSoldBy/'+this.username)
    .subscribe((res: any) => { this.ProductsList = res.data; });
  }

  onCreateConfirm(event) {
    var data = {"name" : event.newData.name,
                "price" : event.newData.price,
                "sellerName" : this.username
                };
 this.http.post('http://localhost:3000/api/Product/createProduct', data).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
        },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  onSaveConfirm(event) {
    console.log('ddddd');
    var data = {"name" : event.newData.name,
                "price" : event.newData.price,
                "sellerNAme" : this.username
                };
  this.http.patch('http://localhost:3000/api/Product/updateProduct/'+event.newData._id, data).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  onDeleteConfirm(event){
    console.log(event.data);
    this.http.delete('http://localhost:3000/api/Product/deleteProduct/'+event.data._id).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.source.data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
      }


}

