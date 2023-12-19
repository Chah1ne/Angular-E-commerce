import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from '../authentification/login/login.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule , 
  ],
  exports:[
    HeaderComponent
  ]
})
export class SharedModule { }
