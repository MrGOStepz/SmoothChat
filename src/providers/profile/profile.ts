import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Firebase
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

//Provider
import { GlobalHelperProvider } from '../global-helper/global-helper';

//Page
import { UserProfile } from '../../app/models/user';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  userDetail: FirebaseObjectObservable<UserProfile>;

  constructor(private afDatabase:AngularFireDatabase,
    private glboalHelper:GlobalHelperProvider,
    private afAuth:AngularFireAuth,
    public http: HttpClient) {
    
  }

  logout(){
    this.glboalHelper.userProfile = {} as UserProfile;
    this.afAuth.auth.signOut();
  }

  getUserDetail(){
    let userProfile = {} as UserProfile
    this.userDetail = this.afDatabase.object('profile/' + this.glboalHelper.userProfile.$key);

    this.userDetail.subscribe(profile => {
      userProfile = profile;
     }
     );

     return userProfile;
  }

  setUserDetail(profile:UserProfile){
    this.afDatabase.object('profile/' + this.glboalHelper.userProfile.$key ).set(profile)
    .then(() => {
      //message is sent
    });
  }

}
