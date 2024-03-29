import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ApiModule, Configuration, ConfigurationParameters } from 'shopping-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthInterceptor } from './shared/services/auth-interceptor';
export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: 'http://localhost:8083/api'
  };
  return new Configuration(params);
}

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

@NgModule({
  declarations: [AppComponent, SignupComponent, ProductDetailsComponent],
  imports: [
    BrowserModule,
    ApiModule.forRoot(apiConfigFactory),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__shopdb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ProductDetailsComponent
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'INR' },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
