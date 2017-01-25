import { Component, OnInit } from '@angular/core';

import { OnlineService } from '../../services/online.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  private sessionId: number;

  constructor(
    protected onlineService: OnlineService,
    protected roomService: RoomService
  ) { }

  ngOnInit() {
     let userObj = JSON.parse(localStorage.getItem('currentUser'));
     this.sessionId = userObj.id;
  }

}
