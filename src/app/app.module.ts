import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ProductsModule } from './products/products.module';
import { AuthentificationModule } from './authentification/authentification.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductsModule,
    AuthentificationModule,
    ShoppingCartModule ,
     SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
