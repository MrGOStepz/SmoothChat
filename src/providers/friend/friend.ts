import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

//Model
import { UserProfile } from '../../app/models/user';
import { GlobalHelperProvider } from '../global-helper/global-helper';


/*
  Generated class for the FriendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FriendProvider {

  friendsListRef$: FirebaseListObservable<UserProfile[]>;
  //friendsListRef$: Observable<Array<UserProfile>>;
  listSearchUserProfile: UserProfile[];

  constructor(private globalHelper:GlobalHelperProvider,
    private afDatabase: AngularFireDatabase,
    public http: HttpClient) {
    
  }

  findFriends(username:string){
    return this.afDatabase.list('profile',{
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    });
  }

  getListFriends(user:UserProfile){
    return this.afDatabase.list('profile/' + user.$key + '/friendslist');
  }

  addFriend(user:UserProfile){
    let temp = {
      firstName: this.globalHelper.userProfile.firstName,
      lastName: this.globalHelper.userProfile.lastName,
      username: this.globalHelper.userProfile.username,
      id: this.globalHelper.userProfile.$key
    }
    this.afDatabase.list('profile/' + this.globalHelper.userProfile.$key + "/friendslist").push(user);
    this.afDatabase.list('profile/' + user.$key + "/friendslist").push(temp);
  }

  deleteFriend(user:UserProfile){
    this.afDatabase.list('profile/' + this.globalHelper.userProfile.$key + "/friendslist").remove(user.$key);
    this.afDatabase.list('profile/' + user.$key + "/friendslist").remove(this.globalHelper.userProfile.$key);
  }

  
  
}
