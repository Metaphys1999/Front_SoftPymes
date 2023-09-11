import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/shared/services/core.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  
  empForm: FormGroup;
  
  constructor(
    private _fb: FormBuilder, 
    private _empService: ProductService, 
    private _dialogRef: MatDialogRef<CreateProductComponent>,
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
            this._coreService.openSnackBar('Product added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }     
      }
  }
}
