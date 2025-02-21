import { Component, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VisibleDirective } from "./directives/visible.directive";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { CardComponent } from "./components/card/card.component";
import { VisibleContainerPartDirective } from "./directives/visible-container-part.directive";
import { FADE_IN_WORDS, ROLL_IN } from "./animations";
import { CardTransformDirective } from "./directives/card-transform.directive";

enum Elements {
  video = "video",
  text = "text",
}

export interface Card {
  label: string;
  title: string;
  description: string;
}

@Component({
  selector: "app-root",
  imports: [
    CommonModule,
    VisibleDirective,
    VisibleContainerPartDirective,
    VideoPlayerComponent,
    CardComponent,
    CardTransformDirective,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  animations: [ROLL_IN, FADE_IN_WORDS],
})
export class AppComponent {
  readonly elements = Elements;

  visibleElement: WritableSignal<Elements | null> = signal(null);
  visibleCardIndex: WritableSignal<number> = signal(0);
  transform: WritableSignal<number> = signal(0);

  cards: Card[] = [
    {
      label: "AND",
      title: "You Don’t Follow Trends. You Set Them.",
      description:
        "You don’t just participate in the market; you shape it, redefine it, own it. Every milestone fuels your next move, every success raises the bar.",
    },
    {
      label: "AND",
      title: "You See What Others Can’t. You Foresee the Future of Change.",
      description:
        "The thrill of creating, the obsession of bringing an idea to life, the relentless pursuit of something monumental—it’s what keeps you moving.",
    },
    {
      label: "AND",
      title: "You Don’t Just Add Value. You Build Legacies.",
      description:
        "You build something that resonates, that becomes a part of people’s lives, that stands for something bigger.",
    },
  ];

  words = [
    "Then,",
    "reading",
    "the",
    "following",
    "is",
    "absolutely",
    "essential",
    "for",
    "you.",
  ];

  onVisible(value: boolean, element: Elements) {
    if (value) {
      this.visibleElement.set(element);
    }
  }

  onPartVisible(part: number) {
    if (part) {
      this.visibleCardIndex.set(part - 1);
    }
  }

  onTransform(transform: number) {
    this.transform.set(transform);
  }
}
