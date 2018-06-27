import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule } from "@angular/http";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage  } from '../pages/main/main';
import { LoginPage } from '../pages/login/login';
import { AuthService} from '../providers/authservice/authservice';
import { WcproviderProvider } from '../providers/wcprovider/wcprovider';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';





export const firebaseConfig = {
  apiKey: "AIzaSyC6A9IPnP4dTEMjn4-GyJ5IO50GTgJ2QeE",
  authDomain: "worldcupapp-1122a.firebaseapp.com",
  databaseURL: "https://worldcupapp-1122a.firebaseio.com",
  projectId: "worldcupapp-1122a",
  storageBucket: "",
  messagingSenderId: "269710138767"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    LoginPage, 
    LeaderboardPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, 
    AngularFireDatabaseModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    LoginPage,
    LeaderboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    WcproviderProvider
  ]
})
export class AppModule {}
