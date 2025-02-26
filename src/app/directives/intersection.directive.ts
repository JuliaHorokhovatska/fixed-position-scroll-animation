import { isPlatformBrowser } from "@angular/common";
import {
  Directive,
  ElementRef,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  output,
  input,
  AfterViewInit,
} from "@angular/core";

@Directive({
  selector: "[appIntersection]",
})
export class IntersectionDirective implements AfterViewInit, OnDestroy {
  threshold = input<number[]>([0.25]);
  rootMargin = input<string>("0px 0px 0px 0px");

  visible = output<boolean>();

  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          this.visible.emit(entry.isIntersecting);
        });
      },
      { threshold: this.threshold(), rootMargin: this.rootMargin() }
    )

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
