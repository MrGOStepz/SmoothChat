import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from "angularfire2/auth";

//Model
import { UserProfile } from '../../app/models/user';
import { GlobalHelperProvider } from '../global-helper/global-helper';


@Injectable()
export class ChatProvider {

  constructor(private globalHelper:GlobalHelperProvider,
    private afAuth:AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public http: HttpClient) {
    console.log('Hello ChatProvider Provider');
  }

  creatGroupChat(userProfile:UserProfile){

    let gid = new Date().getTime() + userProfile.username + this.globalHelper.userProfile.username;

    let name1 = {
      id:gid,
      name:userProfile.username
      
    }

    let name2 = {
      id:gid,
      name:this.globalHelper.userProfile.username
    }

    this.afDatabase.list('profile/' + this.globalHelper.userProfile.$key + "/groupChat").push(name1)
      .then(temp =>{
        this.afDatabase.list('profile/' + userProfile.id + "/groupChat").push(name2);
      });
    

    let nameOfGroup = {
      name: userProfile.username + "|" + this.globalHelper.userProfile.username
    }
    this.afDatabase.object('chat/'+ gid).set(nameOfGroup);

    return gid;

  }

  getListOfGroupChat(){
    console.log('profile/' + this.globalHelper.userProfile.$key + '/groupChat');
    return this.afDatabase.list('profile/' + this.globalHelper.userProfile.$key + '/groupChat');
  }
}
