import { Component } from '@angular/core';

import { ChatPage } from '../chat/chat';
import { SettingPage } from '../setting/setting';
import { FriendPage } from '../friend/friend';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FriendPage;
  tab2Root = ChatPage;
  tab3Root = SettingPage;

  constructor() {

  }
}
