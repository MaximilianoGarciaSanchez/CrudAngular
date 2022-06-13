import { Component } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {SocialUser } from 'angularx-social-login'

//Variable para los eventos de materialize
declare var M:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'Iniciar sesión';//Aparece al inicio de la aplicación
   public user: SocialUser | undefined;
   public loggedIn: boolean = false; //Contiene verdadero si el usuario inició sesión

   constructor(private authService: SocialAuthService){
     this.authService.authState.subscribe((user)=>{
       this.user = user;
       this.loggedIn = (user !=null);
     });
   }//Fin del constructor

   signInWithGoogle():void{
     console.log("Google");
     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
     this.title= "Lista de empleados";
   }
   signInWhithFacebook(): void{
     console.log("Facebook");
     this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
     this.title = "Lista de empleados";
   }
   signOut(): void{
     console.log("Salir");
     this.authService.signOut();
     this.title = "Iniciar sesión";
   }
}
