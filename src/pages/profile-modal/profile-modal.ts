import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { UserProfile } from '../../app/models/user';

import { FirebaseObjectObservable  } from 'angularfire2/database-deprecated';

import { GlobalHelperProvider } from '../../providers/global-helper/global-helper';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the ProfileModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileModalPage {

  public userProfile = {} as UserProfile;

  constructor(private viewController:ViewController,
    private profileProvier:ProfileProvider,
    private globalHelper:GlobalHelperProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.userProfile = this.profileProvier.getUserDetail();
  }

  updateProfile(){
    this.profileProvier.setUserDetail(this.userProfile);
  }

  closeModal(){
    this.viewController.dismiss();
  }

}
