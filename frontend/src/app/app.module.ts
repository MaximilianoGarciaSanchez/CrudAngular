import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Rutas de la aplicación
import { RouterModule, Route } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
//componente para formularios de angular
import { FormsModule } from '@angular/forms';

//componente para conexiones HTTP
import { HttpClientModule } from '@angular/common/http'

//Arreglo para las rutas de la aplicación
const routes: Route[] = [
  { path: 'empleados', component: EmpleadosComponent},
]

//Modulos para inicio de sesión en redes sociales
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
             '214142873952-giabc1kff60u9cj9dgd77q7crdnv9dek.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('712023383273780')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
