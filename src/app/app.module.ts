import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

//Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SettingPage } from '../pages/setting/setting';
import { FriendPage } from '../pages/friend/friend';
import { ChatPage } from '../pages/chat/chat';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ProfileModalPage } from '../pages/profile-modal/profile-modal';
import { SearchFriendsModalPage } from '../pages/search-friends-modal/search-friends-modal';
import { ChatModalPage } from '../pages/chat-modal/chat-modal';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database-deprecated';

//Provider
import { GlobalHelperProvider } from '../providers/global-helper/global-helper';
import { ChatProvider } from '../providers/chat/chat';
import { FriendProvider } from '../providers/friend/friend';
import { ProfileProvider } from '../providers/profile/profile';



//Modal

@NgModule({
  declarations: [
    MyApp,
    SettingPage,
    FriendPage,
    ChatPage,
    TabsPage,
    LoginPage,
    ForgotPasswordPage,
    SearchFriendsModalPage,
    ProfileModalPage,
    ChatModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingPage,
    FriendPage,
    ChatPage,
    TabsPage,
    LoginPage,
    ForgotPasswordPage,
    SearchFriendsModalPage,
    ProfileModalPage,
    ChatModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    ChatProvider,
    FriendProvider,
    GlobalHelperProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfileProvider
  ]
})
export class AppModule {}
