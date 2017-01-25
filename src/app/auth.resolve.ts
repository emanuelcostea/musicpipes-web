import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RoomService } from './services/room.service';

import 'rxjs/add/observable/fromPromise';

@Injectable()
export class AuthResolve implements Resolve<any> {

  constructor(private roomService: RoomService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = +route.params['roomId'];
    return Observable.fromPromise(this.roomService.auth(id));
  }
}