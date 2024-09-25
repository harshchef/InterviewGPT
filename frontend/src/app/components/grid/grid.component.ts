// import { Component } from '@angular/core';
// import { ColDef } from 'ag-grid-community'; // Import ColDef

// @Component({
//   selector: 'app-grid',
//   templateUrl: './grid.component.html',
//   styleUrls: ['./grid.component.css']
// })
// export class GridComponent {

//   // Define column definitions using ColDef type
//   public columnDefs: ColDef[] = [
//     { headerName: 'Make', field: 'make' },
//     { headerName: 'Model', field: 'model' },
//     { headerName: 'Price', field: 'price' }
//   ];

//   // Sample data for the grid
//   public rowData = [
//     { make: 'Toyota', model: 'Camry', price: 24000 },
//     { make: 'Ford', model: 'Mondeo', price: 32000 },
//     { make: 'Porsche', model: 'Boxster', price: 72000 }
//   ];
// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http'; // Import HttpClient
// import { ColDef } from 'ag-grid-community';

// @Component({
//   selector: 'app-grid',
//   templateUrl: './grid.component.html',
//   styleUrls: ['./grid.component.css']
// })
// export class GridComponent implements OnInit {

//   // Define column definitions using ColDef type
//   public columnDefs: ColDef[] = [
//     { headerName: 'ID', field: 'id' },
//     { headerName: 'Name', field: 'name' },
//     { headerName: 'Username', field: 'username' },
//     { headerName: 'Email', field: 'email'  },
//     { headerName: 'City', field: 'address.city' } // Access nested 'address.city'
//   ];

//   // Row data for the grid
//   public rowData: any[] = [];

//   constructor(private http: HttpClient) { }

//   // Fetch data when the component initializes
//   ngOnInit(): void {
//     this.http.get('https://jsonplaceholder.typicode.com/users')
//       .subscribe((data: any) => {
//         // Assign the fetched data to rowData
//         this.rowData = data;
//       });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  // Define column definitions using ColDef type
  public columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true, editable: true },
    { headerName: 'Username', field: 'username', sortable: true, filter: true, editable: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true, editable: true },
    { headerName: 'City', field: 'address.city', sortable: true, filter: true, editable: true }
  ];

  // Row data for the grid
  public rowData: any[] = [];

  // Selected rows
  public selectedRows: any[] = [];

  constructor(private http: HttpClient) { }

  // Fetch data when the component initializes
  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any) => {
        // Assign the fetched data to rowData
        this.rowData = data;
      });
  }

  // Capture selected rows
  onSelectionChanged(event: any) {
    this.selectedRows = event.api.getSelectedRows();
  }

  // Method to handle grid ready event
  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit(); // Optionally size columns to fit the grid width
  }
}
