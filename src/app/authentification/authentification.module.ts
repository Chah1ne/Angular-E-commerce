import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component'; // Assurez-vous d'importer RegisterComponent ici
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    FormsModule,
  ]
})
export class AuthentificationModule { }
