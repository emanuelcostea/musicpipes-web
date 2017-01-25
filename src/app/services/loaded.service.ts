import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { BaseService } from './base.service';
import { File } from '../file.model';

@Injectable()
export class LoadedService extends BaseService {
  onFilesChange: EventEmitter<boolean> = new EventEmitter();

  private _files: File[] = [];

  constructor(
    protected http: Http
  ) { 
    super(http);
  }

  add(file: File) {
    this._files.push(file);
    this.onFilesChange.emit(true);
  }

  remove(file: File) {
    const idx = this._files.indexOf(file);
    if (idx > -1) {
      this._files.splice(idx, 1);
      this.onFilesChange.emit(false);
    }
  }
  
  getFileNames(): Array<string> {
    var fileNames:Array<string> = [];

    for (let file of this._files) {
      fileNames.push(BaseService.filesUrl + file.path);
    }
    return fileNames;
  }

  getById(idx: number): File {
    return this._files.find(f => f.id === idx);
  }
  
  get files(): Array<File> {
    return this._files;
  }

  get total(): number {
    return this._files.length;
  }

  set files(value: Array<File>) {
    this._files = value;
    this.onFilesChange.emit(true);
  }

}
