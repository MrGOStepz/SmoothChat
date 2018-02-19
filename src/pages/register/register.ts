import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

//Models
import { User, UserProfile } from '../../app/models/user';

//Firebase
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

//Page
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  profile = {} as UserProfile;

  constructor(private ofDatabase: AngularFireDatabase,
    public alertCtrl: AlertController,
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  register(user: User){

    this.profile.firstName = "";
    this.profile.lastName = "";
    this.profile.id = "0";
    this.profile.username = user.userName;
    this.profile.listFriend = [];

    this.ofAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
    .then(data => {
      this.profile.id = data.uid;
      this.alert('Register Success!');
      this.ofDatabase.object('/profile/' + data.uid).set(this.profile);
      this.navCtrl.pop();

    })
    .catch(error => {
      this.alert(error.message);
    })
    
  }

  alert(message:string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:message,
      buttons:['OK']
    }).present();
  }

}
