import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

//Firebase
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated'
import { AngularFireAuth } from "angularfire2/auth";
import 'rxjs/add/operator/take';

import { UserProfile, User } from '../../app/models/user';
import { GlobalHelperProvider } from '../../providers/global-helper/global-helper';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public checkLogin:boolean;
  public checkRemember:boolean;

  profileData : FirebaseObjectObservable<UserProfile>;

  user = {} as User;
  rememberUser = {} as User;
  profile = {} as UserProfile;
 

  constructor(public globalVarialbe:GlobalHelperProvider,
    private ofDatabase: AngularFireDatabase,
    public alertCtrl: AlertController,
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController,
    private toast: ToastController, 
    public navParams: NavParams) {
  }

  ionViewCanEnter(){
    //Check Option in Local Storage
    var checkStatus = localStorage.getItem("CheckStatus");
    if(checkStatus == 'true'){
      this.checkRemember = true;
    }
    else{
      this.checkRemember = false;
    }

    var email = localStorage.getItem("email");
    var password = localStorage.getItem("pw");
    if(email != '' && password != '')
    {
      this.rememberUser.email = email;
      this.rememberUser.password = password;
      this.login(this.rememberUser);
    }
  }


  //Alert Function
  alert(message:string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:message,
      buttons:['OK']
    }).present();
  }

  //Login
  login(user:User){
    this.ofAuth.auth.signInWithEmailAndPassword(user.email,user.password)
      .then(data =>{
        if(this.checkRemember){
          localStorage.setItem("email",this.user.email); 
          localStorage.setItem("pw", this.user.password); 
        }
        else{
          localStorage.setItem("email",''); 
          localStorage.setItem("pw",''); 
        }

        this.alert('Login Success!');
        this.checkLogin = true;
        this.initializeProfile();
        
        
      })
      .catch(error => {
        console.log('got an error', error);
        this.alert(error.message);
      })
      console.log('Would sign in with ', user.email,user.password);
  }

  //Initializ Profile
  initializeProfile(){
    this.ofAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
       this.profileData = this.ofDatabase.object('/profile/' + data.uid);
       this.profileData.subscribe(profileDatas => {
          this.profile = profileDatas;
        this.globalVarialbe.userProfile.id = this.profile.id;
        this.globalVarialbe.userProfile.$key = data.uid;
        this.globalVarialbe.userProfile.firstName = this.profile.firstName;
        this.globalVarialbe.userProfile.lastName =  this.profile.lastName;
        this.globalVarialbe.userProfile.username =  this.profile.username;
         this.navCtrl.setRoot(TabsPage);
        }
        );
      }
      else
      {
        this.toast.create({
          message:'Could not find detail',
          duration:3000
        }).present();
      }
    });
  }

  //Logout User
  logoutUser(){
    this.checkLogin = false;
    this.user.email = "";
    this.user.password = "";
    this.globalVarialbe.userProfile.id = "0";
  }

  //Register Page
  register(){
    this.navCtrl.push('RegisterPage');
  }

  //Remember
  rememberMe(){
    if(this.checkRemember == true){
      localStorage.setItem("CheckStatus","true");   
    }else{
      localStorage.setItem("CheckStatus","false"); 
    }
  }


  //Forgot Password
  forgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }

  updateProfile(){
    this.ofAuth.authState.take(1).subscribe(auth => {
      console.log(this.profile.firstName);
      this.ofDatabase.object('/profile/' + auth.uid ).set(this.profile)
      .then(() => {
        //message is sent
      });
      //.then(() =>this.navCtrl.setRoot('HomePage'));
    })
  }

}
