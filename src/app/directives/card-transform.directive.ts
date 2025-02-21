import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appCardTransform]'
})
export class CardTransformDirective {
  transform = input<number>(0);
  visibleCardIndex = input<number>();

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const el = this.el.nativeElement;
    const children = el.children;

    if (this.visibleCardIndex() === 0 && this.transform()) {
      const childElement0 = children[0];
      childElement0.style.transform = `translate(-50%, -50%) scale(${1 - (this.transform() / 20)}) translateY(${(this.transform() * 10 * -1)}%)`;
      childElement0.style.opacity = `${this.transform() > 0.5 ? 0.5 : 1}`;

      const childElement1 = children[1];
      childElement1.style.opacity = `${this.transform() > 0.5 ? 1 : 0}`;
    } else if (this.visibleCardIndex() === 1 && this.transform()) {
      const childElement0 = children[0];
      childElement0.style.transform = `translate(-50%, -50%) scale(${0.95 - (this.transform() / 20)}) translateY(${-10 + (this.transform() * 10 * -1)}%)`;
      childElement0.style.opacity = 0.5;

      const childElement1 = children[1];
      childElement1.style.transform = `translate(-50%, -50%) scale(${1 - (this.transform() / 20)}) translateY(${(this.transform() * 10 * -1)}%)`;
      childElement1.style.opacity = `${this.transform() > 0.5 ? 0.5 : 1}`;

      const childElement2 = children[2];
      childElement2.style.opacity = `${this.transform() > 0.5 ? 1 : 0}`;
    }
  }
}
