import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';

import { AuthGuard } from '@angular/fire/auth-guard';


const routes: Routes = [
  { path: 'edit-product', component: EditProductComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'list-product', component: ListProductComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductRoutingModule { }
