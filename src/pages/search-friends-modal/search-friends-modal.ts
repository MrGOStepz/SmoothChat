import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

//Provider
import { FriendProvider } from '../../providers/friend/friend';
import { UserProfile } from '../../app/models/user';

//Firebase
import { FirebaseListObservable  } from 'angularfire2/database-deprecated';


@IonicPage()
@Component({
  selector: 'page-search-friends-modal',
  templateUrl: 'search-friends-modal.html',
})
export class SearchFriendsModalPage {

  public friends = [];
  listFriendsProfile: UserProfile[]
  friendsListRef$: FirebaseListObservable<UserProfile[]>;

  constructor(public viewController:ViewController,
    private friendProvider:FriendProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

  }

  closeModal(){
    this.viewController.dismiss();
  }

  getItems(ev: any) {
    let val = ev.target.value;
    this.friendsListRef$ = this.friendProvider.findFriends(val);
  }

  setFriend(friend){
    this.friendProvider.addFriend(friend);
  }

}
