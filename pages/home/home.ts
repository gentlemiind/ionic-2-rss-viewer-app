import { Component } from '@angular/core';
import { NavController , LoadingController, ToastController } from 'ionic-angular';
import { MainPage } from "../main/main"
import {AuthService} from "../../providers/authservice/authservice";

import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _auth : AuthService, public ldgCtrl : LoadingController, public toastCtrl : ToastController) {



  }


    signInWithEmail (email : string, password : string ): void {
      let loading = this.ldgCtrl.create({
        content : 'Please wait...'
      });

      loading.present();


      this._auth.signIn(email,password)
        .then(function(user){

          this.doLogin({uid: user.uid});
          loading.dismiss();

        }.bind(this),function(err){
          loading.dismiss();

          const toast = this.toastCtrl.create({
            message: err.message,
            duration: 3000
          });
          toast.present();
        }.bind(this));

    }

    goToSubscribe(){

      this.navCtrl.push(LoginPage);
    }


  doLogin(info){
    this.navCtrl.push(MainPage,info);
  }


}
