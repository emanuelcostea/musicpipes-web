import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { BaseService } from './base.service';
import { File } from '../file.model';

@Injectable()
export class SourcesService extends BaseService {
  private endpointUrl: string = BaseService.apiUrl + 'sources';
  private _files: File[] = [];

  constructor(protected http: HttpService) { 
    super(http);
  }

  get files(): Array<File> {
    return this._files;
  }

  get total(): number {
    return this._files.length;
  }

  set files(value: Array<File>) {
    this._files = value;
  }

  public getFiles() {
    this.http.get(this.endpointUrl).subscribe(
      resources => {
        this.files = resources.json();
      },
      error => console.error(error)
    );
  }
}
