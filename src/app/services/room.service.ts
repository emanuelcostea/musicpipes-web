import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Client } from 'nes/client';

import { AppSettings } from '../app.settings';
import { BaseService } from './base.service';
import { OnlineService } from './online.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class RoomService extends BaseService {
  client: Client;
  room_id: number;

  constructor(
    protected http: Http, 
    protected onlineService: OnlineService
  ) { 
    super(http);
  }

  auth(roomId: number) {
    return new Promise((resolve) => {
      return this.authAssign(roomId).subscribe(
        resource => {
          const data = resource.json();
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.room = +data.room_id;
          this.connect(data.room_id, data.token, resolve);
        },
        error => console.error(error)
      );
    });
  }

  connect(roomId: number, token: string, callback: Function) {
    const authHeader = {
      auth: { headers: { 'Authorization': token } } 
    };

    this.client = new Client(AppSettings.WS_ENDPOINT);
    
    this.client.onDisconnect = () => {
      this.onlineService.sessions = [];
      console.info("CLIENT DISCONNECTED");
    }

    this.client.onConnect = () => {
      if (this.client.subscriptions().length) {
        window.location.reload(false);
      }
    }

    this.client.connect(authHeader, (err) => {
      if (err) return this.connectError(err);

      this.client.subscribe('/room/' + roomId, (u, f) => this.inRoom(u, f), this.subscribeError);
      this.client.subscribe('/room/' + roomId + '/status', (u, f) => this.inRoomStatus(u, f), this.subscribeError);

      callback();
    });
  }

  private inRoom(message, flags) {
    
    console.log('IN ROOM', message, flags);
    console.log(this);
  }

  private inRoomStatus(message, flags) {
    this.onlineService.sessions = message;
  }

  private subscribeError(err) {
    if (err) console.error(err);
  }

  private connectError(err) {
    if (err) console.error(err);
  }

  get room(): number {
    return this.room_id;
  }

  set room(value: number) {
    this.room_id = value;
  }

  private authAssign(roomId: number): Observable<any> {
    let data = roomId ? {room_id: roomId} : null;
    return this.http.post(BaseService.apiUrl + 'auth/assign', data);
  }

}
