import { Injectable } from '@angular/core';

@Injectable()
export class OnlineService {
  _sessions: Array<any> = [];

  constructor() { }

  get sessions(): Array<any> {
    return this._sessions;
  }

  get total(): number {
    return this._sessions.length;
  }

  set sessions(value: Array<any>) {
    this._sessions = value;
  }
}
