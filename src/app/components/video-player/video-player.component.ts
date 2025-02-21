import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  OnChanges,
  signal,
  SimpleChanges,
  ViewChild,
  WritableSignal,
} from "@angular/core";

@Component({
  selector: "app-video-player",
  imports: [CommonModule],
  templateUrl: "./video-player.component.html",
  styleUrl: "./video-player.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements OnChanges, AfterViewInit {
  source = input.required<string>();
  animate = input<boolean>(false);

  isPlaying = false;
  duration = 0;
  currentTime = 0;

  videoIsReady: WritableSignal<boolean> = signal(false);

  @ViewChild("videoPlayer", { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.["animate"]?.currentValue && this.videoIsReady()) {
      this.videoPlayer.nativeElement.play();
    }
  }

  ngAfterViewInit(): void {
    const video = this.videoPlayer.nativeElement;

    if (video) {
      this.videoIsReady.set(true);
      video.muted = true;
    }
  }

  togglePlayPause() {
    const video = this.videoPlayer.nativeElement;

    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  updateProgress() {
    this.currentTime = this.videoPlayer.nativeElement.currentTime;
  }

  setDuration() {
    this.duration = this.videoPlayer.nativeElement.duration;
  }

  seekVideo() {
    this.videoPlayer.nativeElement.currentTime = this.currentTime;
  }

  toggleFullscreen() {
    const video = this.videoPlayer.nativeElement;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }
}
