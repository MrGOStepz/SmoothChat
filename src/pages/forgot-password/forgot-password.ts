import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  public email:string;

  constructor(private afAuth:AngularFireAuth ,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  forgetPassword(){
    this.afAuth.auth.sendPasswordResetEmail(this.email);
 }

}
