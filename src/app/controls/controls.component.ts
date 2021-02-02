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

  constructor() { }

  ngOnInit() {
    this.video.addEventListener('play', () => this.isPlaying = true);
    this.video.addEventListener('pause', () => this.isPlaying = false);
    this.video.addEventListener('ended', () => this.isPlaying = false);

    this.video.addEventListener('canplay', this.updateProgress);
    this.video.addEventListener('timeupdate', this.updateProgress);
  }

  updateProgress(event: Event) {
    const vid = event.target as HTMLVideoElement;

    const progressBar: HTMLDivElement | null = document.querySelector('.progress-bar');

    if (!progressBar) return;

    progressBar.style.width = `${(vid.currentTime / vid.duration) * 100}%`;
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
