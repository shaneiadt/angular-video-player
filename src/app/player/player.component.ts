import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  video: HTMLVideoElement = document.createElement('video');
  src: string = "https://vod-progressive.akamaized.net/exp=1612719148~acl=%2A%2F465540197.mp4%2A~hmac=c35048c8ea0a09e3c210f146365dd79f7f24257ce0c587855e922ff261f16824/vimeo-prod-skyfire-std-us/01/332/6/151662242/465540197.mp4?filename=Cars+-+1900.mp4";
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

  onPlaybackRate(event: { target: { value: number } }) {
    this.playbackSpeed = event.target.value;
    this.video.playbackRate = this.playbackSpeed;
  }

}
