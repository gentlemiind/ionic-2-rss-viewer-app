import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
 //   afAuth.authState.map( data =>{this.currentUser = data   } );
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }
  signIn(email: string, password: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  subscribe(email : string, password : string) :  Promise<void>{


    
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password) ;

  }
  signOut(): void {
    this.afAuth.auth.signOut();
  }
  setDisplayName (currentUser : any , fullname : string ) : Promise<void>{

    return currentUser.user.updateProfile({ displayName : fullname, photoURL : ''});
  }
  displayName() : any {
    if (this.currentUser !== null) {
    
      
      return this.currentUser.displayName;
    } else {
      return '';
    }
  }

  getUID(): any
{
 if (this.currentUser!== null){return this.currentUser.uid;  } 
}
}