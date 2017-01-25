import { Component, Input, OnInit } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { WaveAudioJS } from 'waveaudiojs';

import { LoadedService } from '../../../services/loaded.service';

@Component({
  selector: 'app-create-effect',
  templateUrl: './create-effect.component.html',
  styleUrls: ['./create-effect.component.scss']
})
export class CreateEffectComponent implements OnInit {
  @Input() waveAudio: WaveAudioJS;
  @Input() popover: NgbPopover;
  
  private effectName: string = '';
  private startTime: string = '00:00';
  private endTime: string = '00:00';
  private fileId: number = 0;

  private timeChanged: boolean = false;

  constructor(
    protected loadedService: LoadedService
  ) { }

  ngOnInit() {
  }

  private onTimeInputsKeyPress() {
    let start: number = this.getSeconds(this.startTime);
    let end: number = this.getSeconds(this.endTime);
    if (start >= end 
      || start >= this.waveAudio.duration 
      || end > Math.ceil(this.waveAudio.duration)) {
        this.timeChanged = false;
        return false;
    }
    this.timeChanged = true;
  }

  private onCreate() {
    let start: number, end: number;
    if (+this.fileId > 0) {
      let url = LoadedService.filesUrl + this.loadedService.getById(+this.fileId).path;
      start = this.waveAudio.getLengthAt(url);
      end = start + this.waveAudio.getAudioFileDuration(url);
    } else {
      start = this.getSeconds(this.startTime);
      end = this.getSeconds(this.endTime);
    }

    this.waveAudio.addEffect(
      this.effectName, 
      start * this.waveAudio.sampleRate,
      end * this.waveAudio.sampleRate
    );

    this.popover.close();
  }

  private onReset() {
    this.startTime = '00:00';
    this.endTime = '00:00';
    this.timeChanged = false;
  }

  private onCancel() {
    this.onReset();
    this.fileId = 0;
    this.popover.close();
  }

  private incompleteData() {
    return this.effectName === '' 
      || (!this.timeChanged && this.fileId == 0);
  }

  private get effectNames(): Array<string> {
    return Object.keys(this.waveAudio.effectsList);
  }

  private getSeconds(value: string) {
    let v = value.split(':');
    return +v[0] * 60 + +v[1];
  };
}
