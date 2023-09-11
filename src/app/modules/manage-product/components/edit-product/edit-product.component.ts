import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../../../core/shared/services/core.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  empForm: FormGroup;
  

  constructor(
    private _fb: FormBuilder, 
    private _empService: ProductService, 
    private _dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      name: '',
      distributor: '',
      price: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    });
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data) {
        this._empService.updateProduct(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            //alert('Product updated');
            this._coreService.openSnackBar('Product updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._empService.addProduct(this.empForm.value).subscribe({
          next: (val: any) => {
            //alert('Product added successfully');
            this._coreService.openSnackBar('Product added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }     
        //console.log(this.empForm.value);
      }
  }
}
