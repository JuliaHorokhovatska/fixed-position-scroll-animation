import { Directive, ElementRef, HostListener, output } from "@angular/core";

@Directive({
  selector: "[appVisible]",
})
export class VisibleDirective {
  visible = output<boolean>();

  constructor(private el: ElementRef) {}

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );

    if (rect.top < viewHeight && rect.bottom >= 0) {
      this.visible.emit(true);
    } else {
      this.visible.emit(false);
    }
  }
}
