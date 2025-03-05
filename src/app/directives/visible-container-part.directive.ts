import {
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  inject,
  input,
  OnInit,
  output,
  PLATFORM_ID,
} from "@angular/core";
import { fromEvent, throttleTime } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { isPlatformBrowser } from "@angular/common";

@Directive({
  selector: "[appVisibleContainerPart]",
})
export class VisibleContainerPartDirective implements OnInit {
  partCount = input.required<number>();

  part = output<number>();
  transform = output<number>();

  private destroyRef = inject(DestroyRef);

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    fromEvent(window, "scroll")
      .pipe(takeUntilDestroyed(this.destroyRef), throttleTime(50))
      .subscribe(() => this.emitPartAndTransform());
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
