import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController } from 'ionic-angular';

//Model
import { UserProfile } from '../../app/models/user';

//Firebase
import { FirebaseListObservable  } from 'angularfire2/database-deprecated';

//Provider
import { FriendProvider } from '../../providers/friend/friend';
import { GlobalHelperProvider } from '../../providers/global-helper/global-helper';
import { ChatProvider } from '../../providers/chat/chat';

//Page
import { ChatModalPage } from '../chat-modal/chat-modal';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-friend',
  templateUrl: 'friend.html'
})
export class FriendPage {

  friendsListRef$: FirebaseListObservable<UserProfile[]>;

  constructor(private chatProvide:ChatProvider,
    private modalCtrl:ModalController,
    private toastController:ToastController,
    private alertController:AlertController,
    private globalHelper:GlobalHelperProvider,
    private friendProvider:FriendProvider,
    public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.friendsListRef$ = this.friendProvider.getListFriends(this.globalHelper.userProfile);
  }

  popupChat(friend:UserProfile){
    console.log(("Come HEre"));
    let click: boolean;
    click = true;
    let popupAlert = this.alertController.create({
      title: friend.username,
      message: friend.username,
      buttons:[{
        text: "Chat",
        handler: (inputData)=> {
          
          let gid = this.chatProvide.creatGroupChat(friend);
  
      let chatModal = this.modalCtrl.create(ChatModalPage, { ChatID:gid });
      chatModal.onDidDismiss((friends) => {
        
      });
      chatModal.present();
        }
      },{
        text: "Delete Friend",
        handler: (inputData)=> {
          click = false;
          this.friendProvider.deleteFriend(friend);

          popupAlert.onDidDismiss(()=>{
            let showToast = this.toastController.create({
              message:"Delete " + friend.username,
              duration:2000
            });
            showToast.present();
          });
        }       
      }]
    });

    popupAlert.present();
    



  }

}
