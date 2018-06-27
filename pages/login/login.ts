import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {AuthService } from '../../providers/authservice/authservice';
import { MainPage } from '../main/main';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private _auth : AuthService, public ldgCtrl : LoadingController, public toastCtrl : ToastController) {
  }


  checkPassword (password : string, confirmation : string){

    return (password === confirmation) ? true : false;
  }

  showErrors (msg : string){

    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();


  }

  registerUser(email : string , password : string , confirmation : string ,fullname : string ){


    let loading = this.ldgCtrl.create({
      content : 'registering user...'
    });

  
    loading.present();

   this.checkPassword(password, confirmation) && this._auth.subscribe(email, password)
                                                   .then(function(user){
                                                        loading.setContent('setting display name..');


                                                       return  this._auth.setDisplayName(user,fullname);

                                                        }.bind(this))
                                                        .then((data)=>{
                                                          this.doLogin();
                                                          loading.dismiss();  
                                                        })
                                                      .catch((err)=>{
                                                        this.showErrors(err.message);
                                                        loading.dismiss();  
                                                           
                                                      });

    this.checkPassword(password, confirmation) || (this.showErrors('password doesn\'t match.. ! ' ), loading.dismiss());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  doLogin(){

    this.navCtrl.push(MainPage);

  }

  goBack(){
    this.navCtrl.pop();
  }

}
