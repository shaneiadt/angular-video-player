import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  video: HTMLVideoElement = document.createElement('video');
  src: string = "https://pixabay.com/videos/download/video-31377_tiny.mp4?attachment"
  isPlaying: Boolean = false;
  isFullscreen: Boolean = false;
  isMute: Boolean = false;
  volume: number = 1;
  playbackSpeed: number = 1;

  constructor() { }

  ngOnInit() {
    this.video = document.querySelector('video') as HTMLVideoElement;
  }

  onPlayPause() {
    if (this.isPlaying) {
      this.video.pause();
    } else {
      this.video.play();
    }

    this.isPlaying = !this.isPlaying;
  }

}
