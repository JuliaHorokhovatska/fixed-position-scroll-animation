import { isPlatformBrowser } from "@angular/common";
import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  output,
  input,
} from "@angular/core";

@Directive({
  selector: "[appIntersection]",
})
export class IntersectionDirective implements OnInit, OnDestroy {
  threshold = input<number>(0.1);

  visible = output<boolean>();

  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.visible.emit(entry.isIntersecting);
      },
      { threshold: this.threshold() }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
