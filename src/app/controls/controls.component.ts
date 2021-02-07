import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Output() playPause = new EventEmitter();
  @Output() playbackRate = new EventEmitter();
  @Input() video: HTMLElement = document.createElement('video');

  timeElapsed: string = "00:00";
  timeDuration: string = "2:30";
  isPlaying: boolean = false;
  isMuted: boolean = false;

  constructor() { }

  ngOnInit() {
    this.video.addEventListener('play', () => this.isPlaying = true);
    this.video.addEventListener('pause', () => this.isPlaying = false);
    this.video.addEventListener('ended', () => this.isPlaying = false);

    this.video.addEventListener('canplay', this.updateProgress);
    this.video.addEventListener('timeupdate', this.updateProgress);
  }

  seek(e: MouseEvent) {
    const target: EventTarget | null = e.target;
    const progressBar: HTMLDivElement | null = document.querySelector('.progress-bar');
    const progressRange: HTMLDivElement | null = document.querySelector('.progress-range');

    if (!target || !progressBar || !progressRange) return;

    const { offsetWidth } = progressRange;
    const { offsetX } = e;

    const newTime = offsetX / offsetWidth;

    progressBar.style.width = `${newTime * 100}%`;

    const vid = this.video as HTMLVideoElement;
    vid.currentTime = newTime * vid.duration;
  }

  updateProgress = (event: Event) => {
    const vid = event.target as HTMLVideoElement;

    const progressBar: HTMLDivElement | null = document.querySelector('.progress-bar');

    if (!progressBar) return;

    progressBar.style.width = `${(vid.currentTime / vid.duration) * 100}%`;

    this.timeElapsed = this.displayTime(vid.currentTime);
    this.timeDuration = this.displayTime(vid.duration);
  }

  changeVolume(e: MouseEvent) {
    const volumeRange: HTMLDivElement | null = document.querySelector('.volume-range');
    const volumeBar: HTMLDivElement | null = document.querySelector('.volume-bar');
    const volumeIcon: HTMLDivElement | null = document.querySelector('#volume-icon');

    if (!volumeRange || !volumeBar || !volumeIcon) return;

    let vol = e.offsetX / volumeRange.offsetWidth;

    if (vol < 0.1) {
      vol = 0;
    }

    if (vol > 0.9) {
      vol = 1;
    }

    volumeBar.style.width = `${vol * 100}%`;

    const vid = this.video as HTMLVideoElement;
    vid.volume = vol;

    volumeIcon.className = '';

    if (vol > 0.7) {
      volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (vol < 0.7 && vol > 0) {
      volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (vol === 0) {
      volumeIcon.classList.add('fas', 'fa-volume-off');
    }
  }

  mute() {
    const volumeIcon: HTMLDivElement | null = document.querySelector('#volume-icon');
    const volumeBar: HTMLDivElement | null = document.querySelector('.volume-bar');

    if (!volumeIcon || !volumeBar) return;

    this.isMuted = !this.isMuted;

    const vid = this.video as HTMLVideoElement;
    vid.volume = this.isMuted ? 0 : 1;

    volumeIcon.className = '';
    volumeIcon.classList.add('fas', this.isMuted ? 'fa-volume-mute' : 'fa-volume-up');
    volumeBar.style.width = this.isMuted ? '0%' : '100%';
  }

  displayTime(time: number) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60).toString();
    seconds = parseInt(seconds) > 9 ? seconds : `0${seconds}`;

    return `${minutes}:${seconds}`;
  }

  toggleFullscreen() {
    const docElmWithBrowsersFullScreenFunctions = this.video as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
  }
}
