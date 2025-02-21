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

  isPlaying: WritableSignal<boolean> = signal(false);
  duration: WritableSignal<number> = signal(0);
  currentTime: WritableSignal<number> = signal(0);

  videoIsReady: WritableSignal<boolean> = signal(false);

  @ViewChild("videoPlayer", { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.["animate"]?.currentValue && this.videoIsReady()) {
      this.togglePlayPause(true);
    }
  }

  ngAfterViewInit(): void {
    const video = this.videoPlayer.nativeElement;

    if (video) {
      this.videoIsReady.set(true);
      video.muted = true;
    }
  }

  togglePlayPause(value: boolean) {
    const video = this.videoPlayer.nativeElement;

    if (value) {
      video.play();
      this.isPlaying.set(true);
    } else {
      video.pause();
      this.isPlaying.set(false);
    }
  }

  updateProgress() {
    this.currentTime.set(this.videoPlayer.nativeElement.currentTime);

    if (this.videoPlayer.nativeElement.currentTime === this.videoPlayer.nativeElement.duration) {
      this.isPlaying.set(false);
    }
  }

  setDuration() {
    this.duration.set(this.videoPlayer.nativeElement.duration);
  }

  toggleFullscreen() {
    const video = this.videoPlayer.nativeElement;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }
}
