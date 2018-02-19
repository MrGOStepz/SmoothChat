import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchFriendsModalPage } from './search-friends-modal';

@NgModule({
  declarations: [
    SearchFriendsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchFriendsModalPage),
  ],
})
export class SearchFriendsModalPageModule {}
