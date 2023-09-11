import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { CoreService } from 'src/app/core/shared/services/core.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent  implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'distributor', 
    'price', 
    'quantity',
    'action', 
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _proService: ProductService,
    private _coreService: CoreService,
    private router: Router,
    ) {}

    ngOnInit(): void {
        this.getProductList();
    }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateProductComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      },
    });
  }

  getProductList(){
    this._proService.getProductList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number) {
    this._proService.deleteProduct(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Product deleted', 'done');
        this.getProductList();
      },
      error: console.log,
    });
  }

  sellProduct(id:number){
    
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CreateProductComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      },
    });
  }

  onClick() {
    this._proService.logout()
      .then(() => {
        this._coreService.openSnackBar('Logout Successfully');
        this.router.navigate(['/login']);    
      })
      .catch(error => console.log(error));
  }
}
