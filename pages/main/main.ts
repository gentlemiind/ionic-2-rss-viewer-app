import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import {AuthService} from '../../providers/authservice/authservice';
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";
import { LeaderboardPage } from '../leaderboard/leaderboard';


/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {


  teams:  any;
  worldcup: any;
  uid: string;

  displayName : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http : Http, public ldgCtrl : LoadingController, public _auth : AuthService, public mdCtrl : ModalController) {

    this.displayName = _auth.displayName();

    let loading = this.ldgCtrl.create({
      content : 'Please wait...'
    });

    var url = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json';
    loading.present();
    this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data);
      this.worldcup = data;
      this.teams = data.teams;
      loading.dismiss();
  }, function(err){ console.log(err),       loading.dismiss();
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  viewStadium(){
    this.teams = this.worldcup.stadiums;
  }

  viewTeams(){
    this.teams = this.worldcup.teams;

  }

  viewChannels(){
    this.teams = this.worldcup.tvchannels;
 
  }

  goBack(){
    this.navCtrl.pop();
  }
  showLeaderboard(){
    let leaderboard = this.mdCtrl.create(LeaderboardPage, {teams : this.worldcup.teams});
    leaderboard.present();
  }

  logout(){
    this._auth.signOut();
    this.navCtrl.popAll();
  }

}


