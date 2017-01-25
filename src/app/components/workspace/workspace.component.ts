import { Component, OnInit, ApplicationRef } from '@angular/core';
import { WaveAudioJS } from 'waveaudiojs';
import { LoadedService } from '../../services/loaded.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  waveAudio: WaveAudioJS;
  subscription: any;
  selectedEffect: any;
  selectedEffectChanged: boolean = false;
  playing: boolean = false;
  startTime: string = '00:00';

  constructor(
    protected loadedService: LoadedService,
    protected applicationRef: ApplicationRef
) {}

  ngOnInit() {
    this.initWaveAudio();
    this.subscription = this.loadedService.onFilesChange
      .subscribe(() => this.waveAudio.files(this.loadedService.getFileNames()));
  }

  private applyEffectChanges() {
    this.selectedEffectChanged = false;
    this.waveAudio.applyEffect(this.selected);
  }

  private changedEffectProperties() {
    this.selectedEffectChanged = true;
  }

  private get selected(): any {
    return !this.selectedEffect
      ? this.waveAudio.effects[this.waveAudio.effects.length - 1]
      : this.selectedEffect;
  }

  private set selected(value) {
    this.selectedEffectChanged = false;
    this.selectedEffect = value;
  }

  private playWorkspace() {
    this.playing = !this.playing;
    if (this.playing) {
      let v = this.startTime.split(':');
      let fromSecond = +v[0] * 60 + +v[1];
      if(fromSecond >= this.waveAudio.duration) {
        this.startTime = '00:00';
        fromSecond = 0;
      }
      this.waveAudio.playAudio(fromSecond, () => {
        this.playing = false;
        this.applicationRef.tick();
      });
    } else {
      this.waveAudio.stopAudio();
    }
  }

  private get effectProperties(): Array<any> {
    if (!this.selected) {
      return [];
    }
    return this.waveAudio.effectsList[this.selected.effect].properties;
  }

  private removeEffect($event, effect) {
    $event.stopPropagation();
    if (effect == this.selected) {
      this.waveAudio.removeEffect(effect);
      this.selected = this.waveAudio.effects.length > 1
        ? this.waveAudio.effects[this.waveAudio.effects.length - 1]
        : undefined;
    } else {
      this.waveAudio.removeEffect(effect);
    }
  }

  private convertToTime(value: number) {
    let time = value / this.waveAudio.sampleRate;
    let minutes = Math.floor(time / 60);
    let seconds = Math.ceil(time - minutes * 60);

    let pad = (str) => (new Array(3).join('0') + str).slice(-2);
    return pad(minutes) + ':' + pad(seconds);
  }

  private beautify(str: string) {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }

  private initWaveAudio() {
    this.waveAudio = new WaveAudioJS({
        wrapper: "#waveAudioWrap",
        audioFiles: this.loadedService.getFileNames(),
        audioChannel: 1,
        colors: []
    });
  }
}
