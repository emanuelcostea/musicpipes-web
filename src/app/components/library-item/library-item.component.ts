import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { AppSettings } from '../../app.settings';
import { LoadedService } from '../../services/loaded.service';
import { File } from '../../file.model';

@Component({
  selector: 'library-item',
  templateUrl: './library-item.component.html',
  styleUrls: ['./library-item.component.scss']
})
export class LibraryItemComponent implements OnInit{
  @Input() file: File;
  @ViewChild('player') audio;

  fullPath:string;

  constructor(private loadedService: LoadedService) { }

  ngOnInit() {
    this.fullPath = AppSettings.FILES_PATH + this.file.path;
  }

  loadFile() {
    if (this.file.loaded) {
      delete this.file.loaded;
      this.loadedService.remove(this.file);
    } else {
      this.file.loaded = true;
      this.loadedService.add(this.file);
    }
  }
  
  playFile() {
    if (this.file.playing) {
      delete this.file.playing;
      this.audio.nativeElement.pause();
      this.audio.nativeElement.currentTime = 0;
    } else {
      this.file.playing = true;
      this.audio.nativeElement.play();
    }
  }
}
