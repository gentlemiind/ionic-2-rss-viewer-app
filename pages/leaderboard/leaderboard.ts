import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import {  AngularFireDatabase} from 'angularfire2/database';

import {AuthService } from '../../providers/authservice/authservice';
/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



 
@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

  teams : any;
  savedfavorits :  any;
  myFavorit = [];
  first : string;
  second : string;
  third : string;
  key : string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public _auth : AuthService, public ldgCtrl : LoadingController, public alert : AlertController ) {
    this.teams = navParams.get("teams");

    let loader = this.showLoader( "loading saved favorits ...");
    loader.present();

 
    this.savedfavorits = db.list('/favorits');
    console.log(this.savedfavorits);
    db.object('/favorits').valueChanges().subscribe((favorits) =>{
      
      loader.dismiss();
      console.log(favorits);

    var data : any =   Object.keys(favorits).map((key) =>{
        favorits[key].key = key;
        return favorits[key];
      })
      .filter((favorit)=>{
          return favorit.uid == this._auth.getUID();
      });

      (!data)? (_=>{ 

        let notif = this.alert.create({
          title: "Leaderboard",
          message: "You ve not set yet your leaderboard"
        });
        
        notif.present();
        setTimeout(()=>{notif.dismiss();},2000);

      }):(data && (data[0].favorits)) && (_=> { this.first = data[0].favorits[0]; this.second = data[0].favorits[1]; this.third = data[0].favorits[2], this.myFavorit = data[0].favorits; this.key = data[0].key;})();

    });

  }
  saveFavorits(){


    (this.key != null)? this.update(this.key): this.save();

    
  }
  save(){
    let notif = this.showNotif("Your leaderboard has been saved to the database"),

     loader = this.showLoader( "saving to database ...");


    loader.present();
    this.myFavorit = [this.first, this.second, this.third];
    this.savedfavorits.push({uid: this._auth.getUID(), favorits :  this.myFavorit}).then(function(data){console.log(data); notif.present(); loader.dismiss();
      setTimeout(function(){
        notif.dismiss();
      },2000);
    }).catch(err=> {console.log(err);       loader.dismiss();
    });
  }


  update(key){
    let notif = this.showNotif("Your leaderboard has been updated"),
     loader = this.showLoader("saving to database ...");

    loader.present();
    this.myFavorit = [this.first, this.second, this.third];
    this.savedfavorits.update(key,{uid: this._auth.getUID(), favorits :  this.myFavorit}).then(function(data){console.log(data);       loader.dismiss();
      notif.present();
    
      setTimeout(function(){
        notif.dismiss();
      },2000);
    
    }) .catch(err=>{  console.log(err);       loader.dismiss();  } );

  }

  showLoader(msg : string){
    return this.ldgCtrl.create({
      content : msg
    });

  }

  showNotif(msg : string) : any{
  return  this.alert.create({
      title: "Leaderboard",
      message: msg
    });



  }
  goBack(){
    this.navCtrl.pop();
  }


}
