import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../../app/models/user';

/*
  Generated class for the GlobalHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalHelperProvider {

  public userProfile = {} as UserProfile;

}
