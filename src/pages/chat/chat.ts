import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


//Firebase
import { FirebaseListObservable  } from 'angularfire2/database-deprecated';

//Provider
import { FriendProvider } from '../../providers/friend/friend';
import { GlobalHelperProvider } from '../../providers/global-helper/global-helper';
import { ChatProvider } from '../../providers/chat/chat';

//Page
import { ChatModalPage } from '../chat-modal/chat-modal';

//Model
import { ChatGroup } from '../../app/models/chat.interface';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  groupListRef$: FirebaseListObservable<ChatGroup[]>;

  constructor(private chatProvide:ChatProvider,
    private modalCtrl:ModalController,
    private globalHelper:GlobalHelperProvider,
    private friendProvider:FriendProvider,
    public navCtrl: NavController) {

      this.groupListRef$ = this.chatProvide.getListOfGroupChat();
      console.log(this.groupListRef$);

  }

  openGroupChat(groupChat){
    let chatModal = this.modalCtrl.create(ChatModalPage, { ChatID:groupChat['id'] });
    chatModal.onDidDismiss((friends) => {

    });
    chatModal.present();
  }

}
