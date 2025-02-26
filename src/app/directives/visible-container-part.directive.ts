import {
  Directive,
  ElementRef,
  HostListener,
  input,
  output,
} from "@angular/core";

@Directive({
  selector: "[appVisibleContainerPart]",
})
export class VisibleContainerPartDirective {
  partCount = input.required<number>();

  part = output<number>();
  transform = output<number>();

  private lastCall = 0;

  constructor(private el: ElementRef) {}

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    const throttleEmit = this.throttle(() => {
      this.emitPartAndTransform();
    }, 50);

    throttleEmit();
  }

  throttle(func: Function, limit: number) {
    return (...args: any[]) => {
      const now = Date.now();
      if (now - this.lastCall >= limit) {
        this.lastCall = now;
        func(...args);
      }
    };
  }

  emitPartAndTransform() {
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );
    const parentEl = this.el.nativeElement.getBoundingClientRect();
    const heightEl = parentEl.height;
    const scrollSpace = heightEl - viewHeight;

    const partHeight = scrollSpace / this.partCount();

    const top = Math.abs(parentEl.top);
    const difference = top / partHeight;

    const part = Math.min(Math.ceil(difference), this.partCount());
    const transform = 1 - (part - difference);

    this.part.emit(part);

    this.transform.emit(transform < 1 ? transform : 0);
  }
}
