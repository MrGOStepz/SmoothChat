import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProfile } from '../../app/models/user';

import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { GlobalHelperProvider } from '../../providers/global-helper/global-helper';

/**
 * Generated class for the ChatModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-modal',
  templateUrl: 'chat-modal.html',
})
export class ChatModalPage {

  userName: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];

  friendProfile = {} as UserProfile;
  chatID:string;

  constructor(private globalHelper:GlobalHelperProvider,
    private viewCtrl:ViewController,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.chatID = this.navParams.get('ChatID');
  }

  ionViewDidLoad() {
    console.log(this.navParams);
    this.userName = this.globalHelper.userProfile.username;
    // this.s = this.db.list('/chat').valueChanges().subscribe(data => {
      this._chatSubscription = this.afDatabase.list('chat/' + this.chatID + '/message').subscribe(data => {
      data.map(elem => {
        this.messages = data;
        // this.messages.push(elem);
      })
    });
  }

  closeModal(){
    this.viewCtrl.dismiss({});
  }

  sendMessage(){
    this.afDatabase.list('chat/' + this.chatID + '/message').push({
      userName: this.userName,
      message: this.message
    }).then(() => {
      //message is sent
    })
    // .catch (() => {
    //   //some error. maybe firebase is unrechable
    // })
    this.message ='';
  }

}
