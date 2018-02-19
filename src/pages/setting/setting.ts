import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

//Page
import { LoginPage } from '../login/login';
import { SearchFriendsModalPage } from '../search-friends-modal/search-friends-modal';
import { ProfileModalPage } from '../profile-modal/profile-modal';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  constructor(private modalCtrl:ModalController,
    public navCtrl: NavController) {

  }

  addFriend(){
    let searchFriendsModal = this.modalCtrl.create(SearchFriendsModalPage, { });
    searchFriendsModal.onDidDismiss((friends) => {

    });
    searchFriendsModal.present();
  }

  logout(){
    //this.profileProvider.logout();
    this.navCtrl.setRoot(LoginPage);
    localStorage.setItem("email",''); 
    localStorage.setItem("pw",'');
  }

  updateProfile(){
    let profileModalPage = this.modalCtrl.create(ProfileModalPage, { });
    profileModalPage.onDidDismiss((friends) => {

    });
    profileModalPage.present();
  }

}
